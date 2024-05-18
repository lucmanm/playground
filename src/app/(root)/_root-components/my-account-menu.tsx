"use client";
import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Lock } from "lucide-react";
import React from "react";
import { User } from "next-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MyAccountMenu({ user }: { user: User | undefined }) {
  const router = useRouter();
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="rounded-full"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full "
                />
              ) : (
                <CircleUser />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full cursor-pointer"
              onClick={() => router.push("/login")}
            >
              <Lock className="text-slate-950" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            Login
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}
