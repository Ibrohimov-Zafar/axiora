import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { adminLogin, isAdminLoggedIn } from '@/lib/adminAuth';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) navigate('/dashboard', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(form.username, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.data?.error || err.message || "Login yoki parol noto'g'ri");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 hidden h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px] md:block" />
        <div className="absolute bottom-1/4 right-1/4 hidden h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px] md:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="mb-6">
            <img src="/image.png" alt="Axiora" className="h-10 w-auto" />
          </a>
          <h1 className="font-heading font-bold text-2xl text-foreground">Admin panel</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">Tizimga kirish uchun ma'lumot kiriting</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/90 shadow-xl shadow-primary/5 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-heading tracking-wider text-muted-foreground">Login</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="admin"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/60 bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-heading tracking-wider text-muted-foreground">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-border/60 bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-destructive font-body bg-destructive/10 px-3 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-body font-medium text-sm rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Kirish
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-muted-foreground/50 font-body">
          <a href="/" className="hover:text-primary transition-colors">← Bosh sahifaga qaytish</a>
        </p>
      </motion.div>
    </div>
  );
}
