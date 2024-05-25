"use server";
import CardProjects from "@/components/CardProjects";
import { prisma } from "@/lib/prisma";

import CustomButton from "@/app/(root)/_root-components/CustomButton";
import { auth, signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
  const session = await auth();
  const user = session?.user;
  const projects = await prisma.project.findMany({
    include: {
      technology: true,
    },
  });

  return (
    <section className="w-full py-12 md:py-24 ">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex md:flex-row md:items-start items-center gap-4 md:gap-8 justify-center">
          <div className="grid gap-1 w-full">
            <h1 className="text-2xl font-bold tracking-tight">Explore My Project</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Checkout my previous and current projects.
            </p>
          </div>
          <div>
            {/* only signed can add a project */}
            {session ? (
              <CustomButton>Add Project</CustomButton>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <Button type="submit">Add Project</Button>
              </form>
            )}
          </div>
        </div>

        <section className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-4">
          {projects.length > 0 &&
            projects.map((data, index) => <CardProjects key={index} item={data} user={user} />)}
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
