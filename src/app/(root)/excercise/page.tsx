import React from "react";
import CardExcercise from "./_components/CardExcercise";
import Container from "./_components/Container";
export const exerciseParams = [
  {
    sPath: "CheckboxReactHookFormMultiple",
    title: "Check box Filter",
    description: "testing for checkbox with prisma",
  },
  {
    sPath: "upload-file",
    title: "Upload Excel file",
    description: "Test for importing excel file reads only .xls & .xlsx",
  },
  {
    sPath: "cloudinary",
    title: "Cloudinary Testing",
    description: "I used a cloudinary to test create, read, update, delete of images",
  },
  {
    sPath: "hyper-pay",
    title: "Hyper Pay",
    description: "hyper pay integration excercise",
  },
] as const;

const Excercise = () => {
  return (
    <Container
      className="container flex flex-col space-y-4"
      title="Explore my Excercises"
      description="This all listed is my playground for testing a code to expore more knowledge"
    >
      <section className="flex flex-col lg:grid lg:grid-cols-4 gap-4">
        {exerciseParams.map((data, index) => (
          <CardExcercise key={index} item={data} />
        ))}
      </section>
    </Container>
  );
};

export default Excercise;
