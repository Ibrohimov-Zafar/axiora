import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderOpen, Users, MessageSquare, Globe2,
  Settings, LogOut, Menu, Sun, Moon, Bell, ChevronLeft, Video,
} from 'lucide-react';
import { adminLogout, verifyAdminSession } from '@/lib/adminAuth';
import { api } from '@/api/client';

const NAV = [
  { to: '/dashboard', label: "Umumiy ko'rinish", icon: LayoutDashboard, exact: true },
  { to: '/dashboard/projects', label: 'Loyihalar', icon: FolderOpen },
  { to: '/dashboard/team', label: 'Jamoa', icon: Users },
  { to: '/dashboard/messages', label: 'Xabarlar', icon: MessageSquare, badgeKey: 'messages' },
  { to: '/dashboard/shorts', label: 'Video Shorts', icon: Video },
  { to: '/dashboard/visitors', label: 'Tashriflar', icon: Globe2 },
  { to: '/dashboard/settings', label: 'Sozlamalar', icon: Settings },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('axiora_theme');
    if (saved === 'light') return false;
    return true;
  });

  useEffect(() => {
    verifyAdminSession().then((ok) => {
      if (!ok) navigate('/login', { replace: true });
    });
  }, [navigate]);

  useEffect(() => {
    if (!location.pathname.startsWith('/dashboard')) return;
    api.getMessages({ unread: 'true' })
      .then((msgs) => setUnreadCount(msgs.length))
      .catch(() => setUnreadCount(0));
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('axiora_theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const logout = () => { adminLogout(); navigate('/login', { replace: true }); };

  const isActive = (item) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  const currentPage = NAV.find((n) => isActive(n))?.label ?? 'Dashboard';

  const SidebarContent = () => (
    <div className="flex flex-col h-full min-h-0">
      {/* Logo */}
      <div
        className={`flex items-center h-16 border-b border-border/40 shrink-0 overflow-hidden transition-all duration-300 ${
          collapsed ? 'justify-center px-2' : 'gap-2.5 px-4'
        }`}
      >
        <Link
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center min-w-0 ${collapsed ? 'justify-center' : 'gap-2.5'}`}
          title="Axiora"
        >
          <img
            src="/image.png"
            alt="Axiora"
            className={`object-contain shrink-0 ${collapsed ? 'h-8 w-8' : 'h-8 w-auto max-w-[2.25rem]'}`}
          />
          {!collapsed && (
            <span className="font-heading font-bold text-lg tracking-tight text-primary truncate">
              Axiora
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 min-h-0 px-3 py-4 space-y-1 overflow-y-auto overscroll-contain">
        {NAV.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all duration-200 relative group ${
                active
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badgeKey === 'messages' && unreadCount > 0 && (
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                  {unreadCount}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 rounded-lg bg-popover border border-border/60 text-xs font-body text-foreground shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 shrink-0 border-t border-border/40 pt-3">
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut style={{ width: 18, height: 18 }} className="shrink-0" />
          {!collapsed && <span>Chiqish</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-background">
      {/* Desktop sidebar — fixed height, nav scrolls inside if needed */}
      <aside
        className={`hidden lg:flex flex-col h-full border-r border-border/40 bg-card shrink-0 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-60 bg-card border-r border-border/40 flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area — only this column scrolls */}
      <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Header */}
        <header className="relative z-30 h-16 shrink-0 border-b border-border/40 bg-background flex items-center px-4 sm:px-6 gap-4">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop collapse */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex p-2 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>

          <h1 className="font-heading font-semibold text-foreground text-base flex-1">{currentPage}</h1>

          <div className="flex items-center gap-2">
            {/* Dark mode */}
            <button
              onClick={() => setDark((d) => !d)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
              title={dark ? 'Yorug\' rejim' : 'Qorong\'u rejim'}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-border/40">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="font-heading font-bold text-sm text-primary">A</span>
              </div>
              <span className="hidden sm:block text-sm font-body font-medium text-foreground">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
