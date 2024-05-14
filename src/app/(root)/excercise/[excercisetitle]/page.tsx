import { notFound } from "next/navigation";
import { exerciseParams } from "../page";
import CheckBox from "./_pages/checkbox";
import UploadExcelFile from "./_pages/UploadExcelFile";
import Container from "./_components/Container";

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
    <Container title={checkTitle.title} description={checkTitle.description}>
      {checkTitle.title === "checkbox" && <CheckBox />}
      {checkTitle.title === "uploadfile" && <UploadExcelFile />}
    </Container>
  );
};

export default Excercises;
