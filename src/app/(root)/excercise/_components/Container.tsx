import { cn } from "@/lib/utils";

type TContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

const Container: React.FC<TContainerProps> = ({ children, description, title, className }) => {
  return (
    <main className={cn("container pt-20", className)}>
      <div className="text-left capitalize">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      {children}
    </main>
  );
};

export default Container;
