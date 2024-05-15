import { ImageIcon } from "lucide-react";
import Link from "next/link";
type TItemProps = {
  title: string | undefined;
  description: string | undefined;
};

export default function CardExcercise({ item }: { item: TItemProps }) {
  return (
    <Link href={`/excercise/${item.title}`}>
      <div className="group rounded-lg overflow-hidden  shadow-sm border">
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
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-500  mt-2">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
