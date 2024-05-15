"use client";
import { ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { MouseEvent, MouseEventHandler } from "react";
import { toast } from "./ui/use-toast";
import { deleteProject } from "@/actions/project";
type TItemProps = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
} & {
  technology: {
    name: string;
  }[];
};

export default function CardProjects({ item }: { item: TItemProps }) {
  const onDelete: MouseEventHandler<SVGSVGElement> | undefined = async (event) => {
    event.preventDefault();
    await deleteProject(item.id)
    toast({
      title: "successfully deleted",
      description: "you deleted a project",
      variant: "destructive"
    });
  };
  return (
    <Link href={`/${item.id}`}>
      <div className="group rounded-lg overflow-hidden border shadow-sm relative">
        <ImageIcon className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity" />
        <X
          className="border top-4 right-4 absolute rounded-full size-7 hover:text-red-500 hover:border-red-500 bg-slate-100 "
          onClick={onDelete}
        />
        {/* <Image
        alt="Web Development"
        className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
        height={300}
        src="/placeholder.svg"
        style={{
          aspectRatio: "400/300",
          objectFit: "cover",
        }}
        width={400}
      /> */}
        <div className="p-4 bg-white dark:bg-gray-950">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {item.description}
          </p>
          <div className="flex items-center gap-2 mt-4">
            {item.technology.map((data, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                {data.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
