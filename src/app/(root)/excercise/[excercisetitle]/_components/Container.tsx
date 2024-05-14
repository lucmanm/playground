import { cn } from "@/lib/utils";

type TContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  classsName?: string;
};

const Container: React.FC<TContainerProps> = ({
  children,
  description,
  title,
  classsName,
}) => {
  return (
    <section className={cn("container pt-20", classsName)}>
      <div className="text-left capitalize">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl">{description}</p>
      </div>
      {children}
    </section>
  );
};

export default Container;
