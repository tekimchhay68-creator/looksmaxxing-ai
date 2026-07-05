import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-[var(--accent-sand)] rounded-3xl p-10 bg-white">
        <h1 className="font-serif text-3xl text-foreground">Welcome back.</h1>
        <p className="font-sans text-muted text-sm mt-3 leading-relaxed">
          Sign in to save your Glow Score and track your progress over time.
        </p>

        <div className="mt-8">
          <GoogleSignInButton />
        </div>

        <p className="font-sans text-xs text-muted text-center mt-6 leading-relaxed">
          Your photo is never stored. We only save your analysis results.
        </p>
      </div>
    </main>
  );
}
