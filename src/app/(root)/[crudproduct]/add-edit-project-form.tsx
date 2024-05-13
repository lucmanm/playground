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
import { updateProject } from "./action";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

// zodSchema
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Please enter title of your project"),
  description: z.string().min(1, "Please enter description of your project"),
  technology: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
});

// Combine the Project schema with null

type TProductProps = {
  data: z.infer<typeof projectSchema> | null;
};

export default function AddEditProjectForm({ data }: TProductProps) {
  const router = useRouter();
  const { toast } = useToast();

  const title = data ? "Save" : "Create Project";

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: data
      ? { ...data }
      : {
          name: "",
          description: "",
          technology: [],
        },
  });

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      await updateProject(values);
      toast({
        description: `Succesfully Updated.`,
        variant: "success",
      });
      router.push("/");
    } catch (error) {
      console.log("ERROR_SUBMIT_FORM");
    }
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
            {/* Text Input for title */}
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
                  <FormDescription className="text-red-800 ">
                    {form.formState.errors.name && ""}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TextArea for description */}

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

            {/* check for selection of tech stacks */}

            {/* {data !== null && (
              <FormField
                control={form.control}
                name="technology"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Select Tech</FormLabel>
                      <FormDescription>
                        Select the items you want to display in the sidebar.
                      </FormDescription>
                    </div>
                    {data.technology.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="technology"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0 capitalize"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )} */}

            <Button type="submit">{title}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
