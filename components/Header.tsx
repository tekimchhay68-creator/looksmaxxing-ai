import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="border-b border-accent-sand/60 px-5 sm:px-8 py-5 flex items-center justify-between">
      <Link href="/" className="font-serif text-xl text-foreground tracking-wide hover:opacity-80 transition-opacity">
        Looksmaxxing AI
      </Link>

      <div className="flex items-center gap-5">
        {session?.user ? (
          <>
            <Link
              href="/dashboard"
              className="font-sans text-sm text-muted hover:text-foreground transition-colors"
            >
              History
            </Link>
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "Profile"}
                className="w-7 h-7 rounded-full object-cover border border-accent-sand"
              />
            )}
            <SignOutButton />
          </>
        ) : (
          <Link
            href="/login"
            className="font-sans text-sm text-muted hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
