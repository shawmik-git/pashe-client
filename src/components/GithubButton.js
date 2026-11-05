"use client";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { nextPath } from "@/lib/utils";

export default function GithubButton() {
  const go = async () => {
    const { error } = await authClient.signIn.social({ provider: "github", callbackURL: nextPath() });
    if (error) toast.error(error.message || "GitHub sign-in failed. Try again.");
  };
  return (
    <button type="button" onClick={go} className="btn btn-outline w-full">
      <FaGithub size={18} /> Continue with GitHub
    </button>
  );
}
