import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', phone: '+998 ', company: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      return;
    }
    setSent(true);
    toast.success(t.contact.success);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', phone: '+998 ', company: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-16 md:py-28 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-heading">{t.contact.label}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">{t.contact.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground/60 font-heading tracking-wider block">{t.contact.phone_label}</span>
                  <span className="text-foreground font-body">+998 XX XXX XX XX</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground/60 font-heading tracking-wider block">{t.contact.email_label}</span>
                  <span className="text-foreground font-body">info@axiora.uz</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground/60 font-heading tracking-wider block">{t.contact.location_label}</span>
                  <span className="text-foreground font-body">Toshkent, O'zbekiston</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-sm text-primary font-body">{t.contact.strategic}</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs text-muted-foreground/60 font-heading tracking-wider block mb-2">{t.contact.name}</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl h-12 font-body text-foreground placeholder:text-muted-foreground/40"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground/60 font-heading tracking-wider block mb-2">{t.contact.phone}</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl h-12 font-body text-foreground placeholder:text-muted-foreground/40"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground/60 font-heading tracking-wider block mb-2">{t.contact.company}</label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl h-12 font-body text-foreground placeholder:text-muted-foreground/40"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground/60 font-heading tracking-wider block mb-2">{t.contact.message}</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl font-body text-foreground placeholder:text-muted-foreground/40 resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={sent}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base h-12 rounded-full shadow-lg shadow-primary/25 group"
              >
                {sent ? (
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> ✓</span>
                ) : (
                  <span className="flex items-center gap-2">{t.contact.submit} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}