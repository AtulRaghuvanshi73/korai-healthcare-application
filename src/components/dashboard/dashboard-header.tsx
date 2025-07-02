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
    <header className="sticky top-0 flex h-16 items-center gap-2 sm:gap-4 border-b bg-card px-2 sm:px-4 md:px-8 z-10 m-0 w-full">
      <Link href="/dashboard" className="flex items-center gap-1 sm:gap-2 font-semibold min-w-0">
        <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
        <span className="font-headline text-base sm:text-lg truncate block max-w-[120px] sm:max-w-none">Health Insights Analyzer</span>
      </Link>
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <UserButton afterSignOutUrl="/dashboard" />
      </div>
    </header>
  );
}
