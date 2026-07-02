import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Plus, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { api, getApiErrorMessage } from '@/api/client';
import { FormDialog } from '@/components/dashboard/FormDialog';
import { Button } from '@/components/ui/button';

const roleColor = {
  COO: 'bg-purple-500/10 text-purple-500',
  CPO: 'bg-blue-500/10 text-blue-500',
  CCO: 'bg-pink-500/10 text-pink-500',
  CTO: 'bg-green-500/10 text-green-500',
  BDM: 'bg-orange-500/10 text-orange-500',
  HRD: 'bg-yellow-500/10 text-yellow-500',
  CMO: 'bg-accent/10 text-accent',
};

const TEAM_FIELDS = [
  { name: 'name', label: 'Ism', required: true },
  { name: 'role', label: 'Rol (masalan: CTO)', required: true },
  { name: 'description', label: 'Tavsif', type: 'textarea', required: true },
  { name: 'photo_url', label: 'Rasm URL', placeholder: 'https://...' },
  { name: 'linkedin', label: 'LinkedIn URL' },
  { name: 'twitter', label: 'Twitter URL' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'is_lead', label: 'Team Lead', type: 'checkbox', checkboxLabel: 'Team Lead sifatida ko\'rsatish' },
];

const emptyForm = {
  name: '',
  role: '',
  description: '',
  photo_url: '',
  linkedin: '',
  twitter: '',
  email: '',
  is_lead: false,
};

export default function TeamPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(/** @type {any} */ (null));
  const [form, setForm] = useState(emptyForm);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: () => api.getTeam(),
  });

  const saveMutation = useMutation({
    mutationFn: (/** @type {typeof emptyForm} */ data) => {
      if (editing?.id) {
        return api.updateTeamMember(editing.id, data);
      }
      return api.createTeamMember(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['overview'] });
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
      toast.success(editing ? 'A\'zo yangilandi' : 'A\'zo qo\'shildi');
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!editing?.id) throw new Error('A\'zo tanlanmagan');
      return api.deleteTeamMember(editing.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['overview'] });
      setDialogOpen(false);
      setEditing(null);
      toast.success('A\'zo o\'chirildi');
    },
    onError: (err) => toast.error(getApiErrorMessage(err, 'O\'chirib bo\'lmadi')),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (member) => {
    setEditing(member);
    setForm({
      name: member.name,
      role: member.role,
      description: member.description || member.desc,
      photo_url: member.photo_url || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      email: member.email || '',
      is_lead: member.is_lead || member.lead,
    });
    setDialogOpen(true);
  };

  const handleChange = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const leads = members.filter((m) => m.lead || m.is_lead);
  const others = members.filter((m) => !(m.lead || m.is_lead));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground font-body text-sm">
        Yuklanmoqda...
      </div>
    );
  }

  const MemberCard = ({ m, delay, compact = false }) => (
    <motion.div
      key={m.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl border border-border/60 bg-card/90 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden relative group"
    >
      <button
        type="button"
        onClick={() => openEdit(m)}
        className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        title="Tahrirlash"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <div className={`overflow-hidden bg-secondary/30 relative ${compact ? 'h-48' : 'h-56'}`}>
        {m.photo_url ? (
          <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <span className="font-heading font-bold text-2xl text-primary">{m.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {!compact && (
          <span className={`absolute top-3 left-3 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full ${roleColor[m.role] ?? 'bg-primary/10 text-primary'}`}>
            {m.role}
          </span>
        )}
      </div>
      <div className={compact ? 'p-3' : 'p-4'}>
        {compact && (
          <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full ${roleColor[m.role] ?? 'bg-primary/10 text-primary'}`}>{m.role}</span>
        )}
        <h4 className={`font-heading font-semibold text-foreground ${compact ? 'text-xs mt-1.5' : 'text-sm'}`}>{m.name}</h4>
        <p className={`text-muted-foreground font-body mt-0.5 ${compact ? 'text-[11px]' : 'text-xs'}`}>{m.desc || m.description}</p>
        {!compact && (
          <div className="flex items-center gap-2 mt-3">
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {m.twitter && (
              <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            )}
            {m.email && (
              <a href={`mailto:${m.email}`} className="p-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Jamoa</h2>
          <p className="text-sm text-muted-foreground font-body mt-0.5">{members.length} ta a&apos;zo</p>
        </div>
        <Button onClick={openCreate} className="rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Qo&apos;shish
        </Button>
      </motion.div>

      {leads.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Team Leads</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads.map((m, i) => (
              <MemberCard key={m.id} m={m} delay={i * 0.08} />
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((m, i) => (
              <MemberCard key={m.id} m={m} delay={0.3 + i * 0.07} compact />
            ))}
          </div>
        </div>
      )}

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? 'A\'zoni tahrirlash' : 'Yangi a\'zo'}
        fields={TEAM_FIELDS}
        values={form}
        onChange={handleChange}
        onSubmit={() => saveMutation.mutate(form)}
        onDelete={editing ? () => {
          if (window.confirm('A\'zoni o\'chirasizmi?')) deleteMutation.mutate();
        } : undefined}
        loading={saveMutation.isPending || deleteMutation.isPending}
      />
    </div>
  );
}
