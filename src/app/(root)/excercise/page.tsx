import React from "react";
import CardExcercise from "./_components/CardExcercise";
import Container from "./_components/Container";
import { exerciseParams } from "@/lib/constant";


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
