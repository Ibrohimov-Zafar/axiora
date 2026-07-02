import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Pencil, Video, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/api/client';
import { FormDialog } from '@/components/dashboard/FormDialog';
import { Button } from '@/components/ui/button';
import { getCarouselVideoUrl } from '@/lib/teamMedia';

const SHORT_FIELDS = [
  { name: 'name', label: 'Ism', required: true },
  { name: 'role', label: 'Rol', required: true },
  { name: 'video_url', label: 'Video URL (MP4/Cloudinary)', required: true, placeholder: 'https://res.cloudinary.com/...' },
  { name: 'poster_url', label: 'Poster rasm URL', placeholder: 'https://...' },
  { name: 'youtube_url', label: 'YouTube Shorts URL (ixtiyoriy)', placeholder: 'https://youtube.com/shorts/...' },
  { name: 'is_active', label: 'Faol', type: 'checkbox', checkboxLabel: 'Saytda ko\'rsatish' },
];

const emptyForm = {
  name: '',
  role: '',
  video_url: '',
  poster_url: '',
  youtube_url: '',
  is_active: true,
};

export default function ShortsPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { data: shorts = [], isLoading } = useQuery({
    queryKey: ['shorts-admin'],
    queryFn: () => api.getShortsAdmin(),
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editing ? api.updateShort(editing.id, data) : api.createShort(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shorts-admin'] });
      queryClient.invalidateQueries({ queryKey: ['shorts'] });
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
      toast.success(editing ? 'Video yangilandi' : 'Video qo\'shildi');
    },
    onError: (err) => toast.error(err.data?.error || 'Xatolik yuz berdi'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.deleteShort(editing.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shorts-admin'] });
      queryClient.invalidateQueries({ queryKey: ['shorts'] });
      setDialogOpen(false);
      setEditing(null);
      toast.success('Video o\'chirildi');
    },
    onError: (err) => toast.error(err.data?.error || 'O\'chirib bo\'lmadi'),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (short) => {
    setEditing(short);
    setForm({
      name: short.name,
      role: short.role,
      video_url: short.video_url,
      poster_url: short.poster_url || '',
      youtube_url: short.youtube_url || '',
      is_active: short.is_active,
    });
    setDialogOpen(true);
  };

  const handleChange = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground font-body text-sm">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Video Shorts</h2>
          <p className="text-sm text-muted-foreground font-body mt-0.5">{shorts.length} ta video</p>
        </div>
        <Button onClick={openCreate} className="rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Qo&apos;shish
        </Button>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {shorts.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border/60 bg-card/90 overflow-hidden group relative"
          >
            <button
              type="button"
              onClick={() => openEdit(s)}
              className="absolute top-2 right-2 z-10 p-2 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <div className="aspect-[9/16] bg-secondary/30 relative">
              {s.poster_url ? (
                <img src={s.poster_url} alt={s.name} className="w-full h-full object-cover object-top" />
              ) : (
                <video
                  src={getCarouselVideoUrl(s.video_url)}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold text-primary bg-black/50 px-2 py-0.5 rounded">{s.role}</span>
                <p className="text-sm font-heading font-semibold text-white mt-1">{s.name}</p>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between text-xs font-body text-muted-foreground">
              <span className="flex items-center gap-1">
                <Video className="w-3.5 h-3.5" />
                #{s.sort_order + 1}
              </span>
              {s.is_active ? (
                <span className="flex items-center gap-1 text-green-600"><Eye className="w-3.5 h-3.5" /> Faol</span>
              ) : (
                <span className="flex items-center gap-1 text-muted-foreground"><EyeOff className="w-3.5 h-3.5" /> Yashirin</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? 'Videoni tahrirlash' : 'Yangi video'}
        fields={SHORT_FIELDS}
        values={form}
        onChange={handleChange}
        onSubmit={() => saveMutation.mutate(form)}
        onDelete={editing ? () => {
          if (window.confirm('Videoni o\'chirasizmi?')) deleteMutation.mutate();
        } : undefined}
        loading={saveMutation.isPending || deleteMutation.isPending}
      />
    </div>
  );
}
