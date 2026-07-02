import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Pencil, Handshake, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { api, getApiErrorMessage } from '@/api/client';
import { FormDialog } from '@/components/dashboard/FormDialog';
import { Button } from '@/components/ui/button';

const PARTNER_FIELDS = [
  { name: 'name', label: 'Hamkor nomi', required: true },
  { name: 'logo_url', label: 'Logo URL', placeholder: 'https://res.cloudinary.com/...' },
  { name: 'website_url', label: 'Veb-sayt URL', placeholder: 'https://...' },
  { name: 'is_active', label: 'Faol', type: 'checkbox', checkboxLabel: 'Saytda ko\'rsatish' },
];

const emptyForm = {
  name: '',
  logo_url: '',
  website_url: '',
  is_active: true,
};

export default function PartnersPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners-admin'],
    queryFn: () => api.getPartnersAdmin(),
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editing ? api.updatePartner(editing.id, data) : api.createPartner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners-admin'] });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
      toast.success(editing ? 'Hamkor yangilandi' : 'Hamkor qo\'shildi');
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.deletePartner(editing.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners-admin'] });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      setDialogOpen(false);
      setEditing(null);
      toast.success('Hamkor o\'chirildi');
    },
    onError: (err) => toast.error(getApiErrorMessage(err, 'O\'chirib bo\'lmadi')),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (partner) => {
    setEditing(partner);
    setForm({
      name: partner.name,
      logo_url: partner.logo_url || '',
      website_url: partner.website_url || '',
      is_active: partner.is_active,
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
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Hamkorlar</h2>
          <p className="text-sm text-muted-foreground font-body mt-0.5">{partners.length} ta hamkor</p>
        </div>
        <Button onClick={openCreate} className="rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Qo&apos;shish
        </Button>
      </motion.div>

      {partners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 p-12 text-center">
          <Handshake className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">Hali hamkorlar qo&apos;shilmagan</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border/60 bg-card/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden relative group"
            >
              <button
                type="button"
                onClick={() => openEdit(partner)}
                className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                title="Tahrirlash"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>

              <div className="h-28 flex items-center justify-center bg-secondary/20 p-4">
                {partner.logo_url ? (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="font-heading font-semibold text-lg text-muted-foreground/70 tracking-wide text-center">
                    {partner.name}
                  </span>
                )}
              </div>

              <div className="p-4 border-t border-border/40">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-heading font-semibold text-sm text-foreground truncate">{partner.name}</h4>
                  {partner.is_active ? (
                    <Eye className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  )}
                </div>
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-body mt-1 block truncate hover:underline"
                  >
                    {partner.website_url.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? 'Hamkorni tahrirlash' : 'Yangi hamkor'}
        fields={PARTNER_FIELDS}
        values={form}
        onChange={handleChange}
        onSubmit={() => saveMutation.mutate(form)}
        onDelete={editing ? () => {
          if (window.confirm('Hamkorni o\'chirasizmi?')) deleteMutation.mutate();
        } : undefined}
        loading={saveMutation.isPending || deleteMutation.isPending}
      />
    </div>
  );
}
