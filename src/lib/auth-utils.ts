import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

/**
 * Protects private routes (like /workflows, /dashboard, etc.)
 * Redirects unauthenticated users to /login
 */
export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login"); // Not logged in → go to login
  }

  return session; // Logged in → continue
};

/**
 * Protects public routes (like /login, /signup)
 * Redirects authenticated users to /workflows
 */
export const requireUnauth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/workflows"); // Already logged in → go to workflows
  }

  return null; // Not logged in → continue
};
