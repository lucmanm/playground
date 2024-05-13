"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Project } from "@prisma/client";

// zodSchema
const projectSchema = z.object({
  name: z.string().min(1, { message: "Please enter title of your project" }),
  description: z
    .string()
    .min(1, { message: "Please enter description of your project" }),
});

type TProductProps = {
  data: Project | "";
};

export default function AddEditProjectForm({ data }: TProductProps) {
  const { toast } = useToast();

  const title = data ? "Edit Project" : "Create Project";

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: data
      ? { ...data }
      : {
          name: "",
          description: "",
        },
  });

  function onSubmit(data: z.infer<typeof projectSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="container lg:my-32 border-none">
      <CardHeader>
        <CardTitle>Add Project</CardTitle>
        <CardDescription>
          Enter all the information of your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter title of your project"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-red-800">
                    {form.formState.errors.title && ""}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Text Area for description */}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please enter  description of your project"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-red-800">
                    {form.formState.errors.description && ""}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{title}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
