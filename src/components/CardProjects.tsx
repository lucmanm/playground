import { CodeIcon, ImageIcon } from "lucide-react";
import React from "react";
type TItemProps = {
  name: string | undefined;
  description: string | undefined;
};
export default function CardProjects({ item }: {item: TItemProps}) {
  return (
    <div className="group rounded-lg overflow-hidden border shadow-sm">
      <ImageIcon className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity" />
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
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400">
            HTML
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400">
            CSS
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400">
            JavaScript
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400">
            React
          </span>
        </div>
      </div>
    </div>
  );
}
