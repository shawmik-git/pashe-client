export default function AuthShell({ title, sub, children, footer }) {
  return (
    <div className="wrap grid min-h-[70vh] place-items-center py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <h1 className="section-title">{title}</h1>
        <p className="mt-2 text-base-content/70">{sub}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-6 text-center text-sm">{footer}</p>
      </div>
    </div>
  );
}
