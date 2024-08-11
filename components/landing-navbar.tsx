"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src="/logo.png" alt="Genius logo" fill />
        </div>

        <h1 className="text-2xl font-bold text-white">Genius</h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <Button variant="outline" className="rounded-full">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};
