export const MAX_FREE_COUNTS = 5;
import {
  ArrowRight,
  AudioLines,
  Code,
  ImageIcon,
  MessageSquare,
  VideoIcon,
} from "lucide-react";

export const tools = [
  {
    name: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    name: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    name: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    name: "Text To Speech",
    icon: AudioLines,
    href: "/voice",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];
