"use server";
import CardProjects from "@/components/CardProjects";
import { prisma } from "@/lib/prisma";

import CustomButton from "@/app/(root)/_root-components/CustomButton";

const Dashboard = async () => {
  const projects = await prisma.project.findMany({
    include: {
      technology: true,
    },
  });

  return (
    <section className="w-full py-12 md:py-24 ">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1 w-full">
            <h1 className="text-2xl font-bold tracking-tight">
              Explore My Project 
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Checkout my previous and current projects.
            </p>
          </div>
          <div>
            <CustomButton>Add Product</CustomButton>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8" />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-4">
          {projects.length > 0 &&
            projects.map((data, index) => (
              <CardProjects key={index} item={data} />
            ))}
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
