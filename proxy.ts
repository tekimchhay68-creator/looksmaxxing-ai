import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return (auth as any)(request);
}

export const config = { matcher: ["/dashboard"] };
