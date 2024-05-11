"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bird,
  Book,
  Bot,
  Code2,
  LifeBuoy,
  Settings2,
  SquareTerminal,
  SquareUser,
  Triangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const menuData = [
  {
    name: "Projects",
    url: "/project",
    icon: <SquareTerminal className="size-5" />,
  },
  {
    name: "Models",
    url: "/model",
    icon: <Bot className="size-5" />,
  },
  {
    name: "Api",
    url: "/api",
    icon: <Code2 className="size-5" />,
  },
  {
    name: "Documentation",
    url: "/documentation",
    icon: <Book className="size-5" />,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: <Settings2 className="size-5" />,
  },
];
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Home"
          className="bg-zinc-500"
          asChild
        >
          <Link href="/">
            <Image
              src="/MyLogo.png"
              width={28}
              height={28}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Link>
        </Button>
      </div>
      {/* Menu */}
      <nav className="grid gap-1 p-2">
        {menuData.map((data, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild >
              <Link href={`${data.url}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg hover:bg-muted data-[state=active]:bg-black`}
                  aria-label={data.name}
                >
                  {data.icon}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {data.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Help"
            >
              <LifeBuoy className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/settings">
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
