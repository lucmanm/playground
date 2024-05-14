import Link from "next/link";
import React from "react";
import CardExcercise from "./_components/CardExcercise";
import Container from "./[excercisetitle]/_components/Container";
export const exerciseParams = [
  {
    title: "checkbox",
    description: "testing for checkbox with prisma",
  },
  {
    title: "uploadfile",
    description: "testing for checkbox with prisma",
  },
  {
    title: "checkbox",
    description: "testing for checkbox with prisma",
  },
  {
    title: "uploadfile",
    description: "testing for checkbox with prisma",
  },
  {
    title: "checkbox",
    description: "testing for checkbox with prisma",
  },
  {
    title: "uploadfile",
    description: "testing for checkbox with prisma",
  },
  {
    title: "checkbox",
    description: "testing for checkbox with prisma",
  },
  {
    title: "uploadfile",
    description: "testing for checkbox with prisma",
  },
];

const Excercise = () => {
  return (
    <section className="container grid lg:grid-cols-4 lg:gap-4 my-4" >
      {exerciseParams.map((data, index) => (
        <CardExcercise key={index} item={data} />
      ))}
    </section>
  );
};

export default Excercise;
