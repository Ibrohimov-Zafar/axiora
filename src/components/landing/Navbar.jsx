import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Menu, X, Sun, Moon, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const navLinks = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'process', href: '#process' },
  { key: 'team', href: '#team' },
  { key: 'faq', href: '#faq' },
];

export default function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:pt-4"
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl border backdrop-blur-2xl transition-all duration-500 ${
          mobileOpen
            ? 'border-black/10 bg-background shadow-[0_18px_60px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-background dark:shadow-black/30'
            : scrolled
            ? 'border-black/10 bg-background/90 shadow-[0_18px_60px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-background/80 dark:shadow-black/30'
            : 'border-black/[0.06] bg-background/60 shadow-[0_12px_36px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-background/40 dark:shadow-black/20'
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14 px-3 sm:px-4' : 'h-16 px-3 sm:px-5'}`}>
          <a href="#hero" className="flex items-center flex-shrink-0">
            <motion.img
              src="/logo.png"
              alt="Axiora"
              animate={{ height: scrolled ? 34 : 42 }}
              transition={{ duration: 0.35 }}
              className="w-auto object-contain"
            />
            <span className="font-heading font-bold text-lg tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Axiora</span>
          </a>

          <div className="hidden lg:flex items-center gap-1 rounded-full border border-black/10 bg-black/[0.03] p-1 dark:border-white/10 dark:bg-white/[0.04]">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={`rounded-full px-3.5 font-body text-muted-foreground transition-all duration-300 hover:bg-background/80 hover:text-foreground hover:shadow-sm dark:hover:bg-white/10 ${
                  scrolled ? 'py-1.5 text-xs' : 'py-2 text-sm'
                }`}
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2.5">
            <div className="flex items-center rounded-full border border-black/10 bg-black/[0.03] p-1 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
              <button
                onClick={() => setLang('uz')}
                className={`px-3 py-1 rounded-full font-medium transition-all duration-300 min-w-[36px] ${
                  scrolled ? 'text-[10px]' : 'text-xs'
                } ${
                  lang === 'uz'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Uzbek language"
              >
                UZ
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full font-medium transition-all duration-300 min-w-[36px] ${
                  scrolled ? 'text-[10px]' : 'text-xs'
                } ${
                  lang === 'en'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="English language"
              >
                EN
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/10 dark:border-white/10 dark:bg-white/[0.04]"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            <a href="#contact">
              <Button
                className={`bg-primary hover:bg-primary/90 text-primary-foreground font-body rounded-full shadow-lg shadow-primary/25 transition-all duration-300 ${
                  scrolled ? 'text-xs px-4 py-1.5 h-8' : 'text-sm px-6 h-9'
                }`}
              >
                {t.nav.contact}
              </Button>
            </a>

            <a
              href="/login"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/10 dark:border-white/10 dark:bg-white/[0.04]"
              title="Admin panel"
            >
              <LogIn className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <a
              href="/login"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground dark:border-white/10 dark:bg-white/[0.04]"
              title="Admin panel"
            >
              <LogIn className="h-4 w-4" />
            </a>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground dark:border-white/10 dark:bg-white/[0.04]"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground dark:border-white/10 dark:bg-white/[0.04]"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-black/10 dark:border-white/10 rounded-b-2xl overflow-hidden"
          >
            <div className="px-2 pt-1.5 pb-1">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center rounded-xl px-3 py-3 font-body text-sm text-foreground/70 transition-colors hover:bg-black/[0.04] hover:text-foreground dark:text-muted-foreground dark:hover:bg-white/[0.06] dark:hover:text-foreground"
                >
                  {t.nav[link.key]}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-black/10 dark:border-white/10 px-3 py-3">
              <div className="flex items-center rounded-full bg-black/[0.04] dark:bg-white/[0.06] p-1 shrink-0">
                <button
                  onClick={() => setLang('uz')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    lang === 'uz' ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground'
                  }`}
                  aria-label="Uzbek language"
                >
                  UZ
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    lang === 'en' ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground'
                  }`}
                  aria-label="English language"
                >
                  EN
                </button>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 min-w-0"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm rounded-full shadow-lg shadow-primary/25 h-9">
                  {t.nav.contact}
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
