import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t, lang, setLang } = useI18n();

  return (
    <footer className="border-t border-border/30 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/image.png" alt="Axiora" className="h-8 w-auto object-contain" />
          </div>

          {/* Lang toggle */}
          <div className="flex items-center bg-secondary rounded-full p-1 border border-border/30">
            <button
              onClick={() => setLang('uz')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                lang === 'uz' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              EN
            </button>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-body">
            © 2026 Axiora · {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}