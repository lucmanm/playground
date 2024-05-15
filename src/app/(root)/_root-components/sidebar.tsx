import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Book,
  Code2,
  Contact2Icon,
  SquareTerminal,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const menuData = [
  {
    name: "Projects",
    url: "/",
    icon: <SquareTerminal className="size-5" />,
  },
  {
    name: "Excercise",
    url: "/excercise",
    icon: <Code2 className="size-5" />,
  },
  {
    name: "About Me",
    url: "/about-me",
    icon: <Book className="size-5" />,
  },
];
export default function Sidebar() {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col  bg-slate-950 text-slate-100">
      <div className=" p-2">
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
            <TooltipTrigger asChild>
              <Link href={`${data.url}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg data-[state=active]:bg-black`}
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
            <Link href="/contact-me">
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <Contact2Icon className="size-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Contact Me
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
                <User2 className="size-5" />
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
