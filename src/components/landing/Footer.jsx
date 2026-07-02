import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t, lang, setLang } = useI18n();

  return (
    <footer className="border-t border-border/30 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="flex justify-center md:justify-start">
            <img src="/image.png" alt="Axiora" className="h-8 w-auto object-contain" />
          </div>

          <div className="flex justify-center">
            <div className="flex items-center bg-secondary rounded-full p-1 border border-border/30">
              <button
                type="button"
                onClick={() => setLang('uz')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === 'uz' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                UZ
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-body text-center md:text-right">
            © 2026 Axiora · {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}