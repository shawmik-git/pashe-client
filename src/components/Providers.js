"use client";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "var(--color-base-100)", color: "var(--color-base-content)", border: "1px solid var(--color-base-300)" } }}
      />
    </>
  );
}
