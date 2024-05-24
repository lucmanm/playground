import { notFound } from "next/navigation";
import { exerciseParams } from "../page";
import UploadExcelFile from "./_pages/UploadExcelFile";
import Container from "../_components/Container";
import Cloudinary from "./_pages/cloudinary";
import { CheckboxReactHookFormMultiple } from "./_pages/CheckboxReactHookFormMultiple";

type TexcercisesProps = {
  params: { excercisetitle: string };
};

const Excercises: React.FC<TexcercisesProps> = ({ params }) => {
  // decode the params if there some spaces others to convert it back to string.
  const path = decodeURI(params.excercisetitle);

  // find matching pathname from excecise constant data
  const checkTitle = exerciseParams.find((data) => data.sPath === path);

  // if it no true not found will show
  if (!checkTitle) {
    notFound();
  }
  return (
    <Container title={checkTitle.title} description={checkTitle.description}>
      {checkTitle.sPath === "CheckboxReactHookFormMultiple" && <CheckboxReactHookFormMultiple/>}
      {checkTitle.sPath === "upload-file" && <UploadExcelFile />}
      {checkTitle.sPath === "cloudinary" && <Cloudinary />}
    </Container>
  );
};

export default Excercises;
