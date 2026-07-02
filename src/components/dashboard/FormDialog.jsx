import React from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-heading tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  fields,
  values,
  onChange,
  onSubmit,
  onDelete,
  submitLabel = 'Saqlash',
  loading = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <Field key={field.name} label={field.label}>
              {field.type === 'textarea' ? (
                <Textarea
                  value={values[field.name] ?? ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  rows={field.rows || 3}
                  required={field.required}
                  className="font-body resize-none"
                />
              ) : field.type === 'select' ? (
                <select
                  value={values[field.name] ?? ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-body"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(values[field.name])}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                    className="rounded border-border"
                  />
                  {field.checkboxLabel || field.label}
                </label>
              ) : (
                <Input
                  type={field.type || 'text'}
                  value={values[field.name] ?? ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="font-body"
                />
              )}
            </Field>
          ))}
          <DialogFooter className="gap-2 sm:gap-0">
            {onDelete && (
              <Button type="button" variant="destructive" onClick={onDelete} disabled={loading} className="mr-auto">
                O&apos;chirish
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Bekor
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saqlanmoqda...' : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
