import { notFound } from "next/navigation";
import { exerciseParams } from "../page";
import CheckBox from "./_pages/checkbox";
import UploadExcelFile from "./_pages/UploadExcelFile";
import Container from "./_components/Container";

type TexcercisesProps = {
  params: { excercisetitle: string };
};

const Excercises: React.FC<TexcercisesProps> = ({ params }) => {
  const path = decodeURI(params.excercisetitle)
  console.log(path);
  
  const checkTitle = exerciseParams.find(
    (data) => data.sPath === path
  );
  if (!checkTitle) {
    notFound();
  }
  return (
    <Container title={checkTitle.title} description={checkTitle.description}>
      {checkTitle.sPath === "checkbox" && <CheckBox />}
      {checkTitle.sPath === "upload-file" && <UploadExcelFile />}
    </Container>
  );
};

export default Excercises;
