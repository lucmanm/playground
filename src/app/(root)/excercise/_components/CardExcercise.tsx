import { ImageIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
type TItemProps = {
  sPath: string;
  title: string;
  description: string;
};

export default function CardExcercise({ item }: { item: TItemProps }) {
  return (
    <Link href={`/excercise/${item.sPath}`}>
      <div className="group rounded-lg overflow-hidden  shadow-sm border flex flex-col">
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
        <FaGithub className="absolute size-7"/>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-500  mt-2">{item.description}</p>
        </div>
      </div>
    </Link>
  );
}
