import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useModalLock } from '@/hooks/use-modal-lock';

export function ModalPortal({
  open,
  onClose,
  children,
  overlayClassName = 'fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 max-md:backdrop-blur-none md:backdrop-blur-sm',
  ariaLabel,
}) {
  useModalLock(open, onClose);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={overlayClassName}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
