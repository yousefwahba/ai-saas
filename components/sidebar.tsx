"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  AudioLines,
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    name: "Conversations",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    name: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    name: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    name: "Text To Speech",
    icon: AudioLines,
    href: "/voice",
    color: "text-emerald-500",
  },
  {
    name: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount = 0 }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
          <div className="h-8 w-8 relative mr-4">
            <Image src="/logo.png" alt="logo" fill />
          </div>
          <h1 className={cn("text-2xl font-bold")}>Genius</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname == route.href
                  ? "text-white bg-white/10 rounded-lg transition"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
