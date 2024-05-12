import { signOut } from "next-auth/react";

export function handleSignOut() {
    signOut({ callbackUrl: '/' });
  }