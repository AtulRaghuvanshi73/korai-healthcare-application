'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Leaf, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserButton } from '@clerk/nextjs';

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/dashboard');
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-8 z-10 m-0">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg">Health Insights Analyzer</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <UserButton afterSignOutUrl="/dashboard" />
      </div>
    </header>
  );
}
