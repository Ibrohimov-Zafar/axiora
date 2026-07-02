import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, AlertTriangle, Lightbulb, Plus, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/api/client';
import { FormDialog } from '@/components/dashboard/FormDialog';
import { Button } from '@/components/ui/button';

const CATS = ['Barchasi', 'SaaS', 'EdTech', 'E-commerce', 'AI', 'CRM', 'ERP'];
const PROJECT_CATS = CATS.filter((c) => c !== 'Barchasi');
const STATUSES = ['Tugallangan', 'Jarayonda', 'Rejalashtirilgan'];

const statusColor = {
  'Tugallangan': 'bg-green-500/10 text-green-500',
  'Jarayonda': 'bg-yellow-500/10 text-yellow-500',
  'Rejalashtirilgan': 'bg-blue-500/10 text-blue-500',
};

const PROJECT_FIELDS = [
  { name: 'cat', label: 'Kategoriya', type: 'select', options: PROJECT_CATS, required: true },
  { name: 'name', label: 'Nomi', required: true },
  { name: 'problem', label: 'Muammo', type: 'textarea', required: true },
  { name: 'solution', label: 'Yechim', type: 'textarea', required: true },
  { name: 'result', label: 'Natija', required: true },
  { name: 'status', label: 'Holat', type: 'select', options: STATUSES, required: true },
];

const emptyForm = {
  cat: 'SaaS',
  name: '',
  problem: '',
  solution: '',
  result: '',
  status: 'Jarayonda',
};

export default function Projects() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Barchasi');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.getProjects(),
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editing ? api.updateProject(editing.id, data) : api.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['overview'] });
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
      toast.success(editing ? 'Loyiha yangilandi' : 'Loyiha qo\'shildi');
    },
    onError: (err) => toast.error(err.data?.error || 'Xatolik yuz berdi'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.deleteProject(editing.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['overview'] });
      setDialogOpen(false);
      setEditing(null);
      toast.success('Loyiha o\'chirildi');
    },
    onError: (err) => toast.error(err.data?.error || 'O\'chirib bo\'lmadi'),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      cat: project.cat,
      name: project.name,
      problem: project.problem,
      solution: project.solution,
      result: project.result,
      status: project.status,
    });
    setDialogOpen(true);
  };

  const handleChange = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const filtered = projects.filter((p) => {
    const matchCat = cat === 'Barchasi' || p.cat === cat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground font-body text-sm">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Loyihalar</h2>
          <p className="text-sm text-muted-foreground font-body mt-0.5">{filtered.length} ta loyiha</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-xl border border-border/60 bg-background text-sm font-body placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
            />
          </div>
          <Button onClick={openCreate} className="rounded-xl gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            Qo&apos;shish
          </Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
              cat === c ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </motion.div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border/60 bg-card/90 shadow-sm p-5 hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col gap-4 relative group"
          >
            <button
              type="button"
              onClick={() => openEdit(p)}
              className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 border border-border/60 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
              title="Tahrirlash"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start justify-between pr-8">
              <span className="text-[10px] tracking-wider font-heading font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{p.cat}</span>
              <span className={`text-[10px] font-body px-2.5 py-1 rounded-full ${statusColor[p.status] || 'bg-secondary text-muted-foreground'}`}>{p.status}</span>
            </div>
            <h3 className="font-heading font-semibold text-foreground text-sm leading-snug">{p.name}</h3>
            <div className="space-y-2 mt-auto">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body">{p.problem}</p>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body">{p.solution}</p>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-border/30">
                <TrendingUp className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <p className="text-xs font-mono font-semibold text-green-500">{p.result}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? 'Loyihani tahrirlash' : 'Yangi loyiha'}
        fields={PROJECT_FIELDS}
        values={form}
        onChange={handleChange}
        onSubmit={() => saveMutation.mutate(form)}
        onDelete={editing ? () => {
          if (window.confirm('Loyihani o\'chirasizmi?')) deleteMutation.mutate();
        } : undefined}
        loading={saveMutation.isPending || deleteMutation.isPending}
      />
    </div>
  );
}
