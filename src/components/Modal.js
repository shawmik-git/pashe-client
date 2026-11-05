export default function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <dialog className="modal modal-open" aria-label={title}>
      <div className={`modal-box ${wide ? "max-w-2xl" : ""}`}>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
      <div className="modal-backdrop cursor-default" onClick={onClose} />
    </dialog>
  );
}
