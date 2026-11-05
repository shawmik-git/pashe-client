export default function Field({ label, error, children }) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      {children}
      {error && <p className="text-sm text-error" role="alert">{error}</p>}
    </fieldset>
  );
}
