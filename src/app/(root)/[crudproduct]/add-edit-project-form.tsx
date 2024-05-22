"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { createProject, updateProject } from "@/actions/project";
import { defaultFormProjectSchema, defaultProjectSchema, defaultTechnologySchema } from "@/type/validation";

export const zodResolverPrjectScema = z.object({
  name: z.string().min(1, "Please enter title of your project"),
  description: z.string().min(1, "Please enter description of your project"),
  technology: z.array(
    z.object({
      name: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    })
  ),
});


type TAddEditProjectForm = {
  data: z.infer<typeof defaultProjectSchema> | null;
  technology: z.infer<typeof defaultTechnologySchema>;
};

const AddEditProjectForm: React.FC<TAddEditProjectForm> = ({ data, technology }) => {
  const router = useRouter();
  const { toast } = useToast();

  const title = data ? "Save Changes" : "Create Project";

  const form = useForm<z.infer<typeof zodResolverPrjectScema>>({
    resolver: zodResolver(defaultFormProjectSchema),
    defaultValues: data
      ? { ...data, technology }
      : {
          name: "",
          description: "",
          technology: [],
        },
  });

  const onSubmit = async (values: z.infer<typeof zodResolverPrjectScema>) => {
    try {
      if (data) {
        await updateProject(values);
        toast({
          description: `Succesfully Updated.`,
          variant: "success",
        });
      } else {
        await createProject(values);
        toast({
          description: `Succesfully Created.`,
          variant: "success",
        });
      }
      router.push("/");
    } catch (error) {
      console.log("ERROR_SUBMIT_FORM", error);
    }
  };

  return (
    <Card className="container lg:my-32 border-none">
      <CardHeader>
        <CardTitle>Add Project</CardTitle>
        <CardDescription>Enter all the information of your project</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            {/* Text Input for title */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter title of your project" {...field} />
                  </FormControl>
                  <FormDescription className="text-red-800 ">{form.formState.errors.name && ""}</FormDescription>
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
                    <Textarea placeholder="Please enter  description of your project" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription className="text-red-800">{form.formState.errors.description && ""}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* check for selection of tech stacks */}

            {
              <FormField
                control={form.control}
                name="technology"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Select Tech</FormLabel>
                      <FormDescription>Select the items you want to display in the sidebar.</FormDescription>
                    </div>
                    {technology.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="technology"
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 capitalize">
                              <FormControl>
                                <Checkbox
                                  // checked={field.value?.includes(item.id => ({data?.technology.}))}
                                  // onCheckedChange={(checked) => {
                                  //   return checked
                                  //     ? field.onChange([...field.value, item.id])
                                  //     : field.onChange(field.value?.filter((value) => value !== item.id));
                                  // }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.name}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            }

            <Button type="submit" disabled={form.formState.isLoading}>
              {title}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default AddEditProjectForm;
