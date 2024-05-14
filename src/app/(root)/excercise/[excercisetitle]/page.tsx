import { notFound } from "next/navigation";
import { exerciseParams } from "../page";
import CheckBox from "./_components/checkbox";

type TexcercisesProps = {
  params: { excercisetitle: string };
};

const Excercises: React.FC<TexcercisesProps> = ({ params }) => {
  const checkTitle = exerciseParams.find(
    (data) => data.title === params.excercisetitle
  );
  if (!checkTitle) {
    notFound();
  }
  return <>{checkTitle.title === "checkbox" ? <CheckBox /> : notFound()}</>;
};

export default Excercises;
