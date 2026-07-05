"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="font-sans text-sm text-muted hover:text-foreground transition-colors"
    >
      Sign out
    </button>
  );
}
