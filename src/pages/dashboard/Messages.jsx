import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MessageSquare, Trash2 } from 'lucide-react';
import { api } from '@/api/client';
import { formatVisitTime } from '@/lib/visitTracker';

export default function Messages() {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => api.getMessages(),
  });

  const markRead = useMutation({
    mutationFn: (id) => api.markMessageRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  const remove = useMutation({
    mutationFn: (id) => api.deleteMessage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground font-body text-sm">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading font-bold text-xl text-foreground">Xabarlar</h2>
        <p className="text-sm text-muted-foreground font-body mt-0.5">
          {unreadCount > 0 ? `${unreadCount} ta o'qilmagan xabar` : "Barcha xabarlar o'qilgan"}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border/60 bg-card/90 shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="px-5 py-12 text-center text-muted-foreground font-body text-sm">
            Hozircha xabarlar yo'q
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => !msg.read && markRead.mutate(msg.id)}
              className={`flex items-start gap-4 px-5 py-4 border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer ${!msg.read ? 'bg-primary/[0.03]' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-heading font-semibold text-sm text-primary">{msg.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-heading font-semibold text-sm text-foreground">{msg.name}</span>
                  <span className="text-[10px] text-muted-foreground/60 font-body shrink-0">
                    {formatVisitTime(msg.created_at)}
                  </span>
                </div>
                {msg.phone && (
                  <p className="text-[10px] text-muted-foreground/50 font-body">{msg.phone}{msg.company ? ` · ${msg.company}` : ''}</p>
                )}
                <p className="text-xs text-muted-foreground font-body mt-0.5">{msg.text}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                {!msg.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Xabarni o'chirasizmi?")) remove.mutate(msg.id);
                  }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="O'chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </motion.div>

      {messages.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
          <MessageSquare className="w-3.5 h-3.5" />
          Jami {messages.length} ta xabar
        </div>
      )}
    </div>
  );
}
