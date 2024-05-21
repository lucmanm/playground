"use client";
import { ImageIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

type TItemProps = {
  sPath: string;
  title: string;
  description: string;
};

export default function CardExcercise({ item }: { item: TItemProps }) {
  const router = useRouter();
  return (
    <Link href={`/excercise/${item.sPath}`}>
      <Card className="relative group/card rounded-lg overflow-hidden  shadow-sm border flex flex-col h-full">
        <ImageIcon
          className="w-full h-60 object-cover
        "
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
        <div className="absolute w-full h-full flex items-center justify-center hover:bg-slate-950/5">
          <FaGithub
            className="scale-0 opacity-0 group-hover/card:opacity-100 transition-all dura1 group-hover/card:scale-100 absolute size-10  self-center bg-slate-100 rounded-full"
            onClick={(event) => {
              event.preventDefault();
              router.push(`/excercise/${item.sPath}`);
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-500  mt-2">{item.description}</p>
        </div>
      </Card>
    </Link>
  );
}
