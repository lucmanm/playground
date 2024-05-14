import { notFound } from "next/navigation";
import { exerciseParams } from "../page";
import CheckBox from "./_components/checkbox";
import UploadExcelFile from "./_components/UploadExcelFile";

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
  return (
    <section className="container flex  justify-center h-full pt-20">
      {checkTitle.title === "checkbox" && <CheckBox />}
      {checkTitle.title === "uploadfile" && <UploadExcelFile />}
    </section>
  );
};

export default Excercises;
