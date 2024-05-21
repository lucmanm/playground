import Link from "next/link";
import React from "react";
import CardExcercise from "./_components/CardExcercise";
import Container from "./[excercisetitle]/_components/Container";
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
];

const Excercise = () => {
  return (
    <Container
      className="container grid lg:grid-cols-4 lg:gap-4 my-4"
      title="Explore my Excercises"
      description="This all listed is my playground for testing a code to expore more knowledge"
    >
      {exerciseParams.map((data, index) => (
        <CardExcercise key={index} item={data} />
      ))}
    </Container>
  );
};

export default Excercise;
