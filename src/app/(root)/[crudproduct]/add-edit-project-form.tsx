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
import { defaultProjectSchema, defaultTechnologySchema } from "@/type/validation";

export const defaultProjectFormSchema = z
  .object({
    domain: z.string().min(1, "Please enter domain or website of your project"),
    github: z.string().min(1, "Please enter domain or website of your project"),
    description: z.string().min(1, "Please enter description of your project"),
    technology: z.array(
      z.object({
        name: z.string(),
      })
    ),
  })
  .refine(({ technology }) => technology.length > 0, {
    message: "You have to select at least one item.",
    path: ["technology"],
  });

type TProjectForm = {
  data: z.infer<typeof defaultProjectSchema> | null;
  technology: z.infer<typeof defaultTechnologySchema>;
};

const AddEditProjectForm: React.FC<TProjectForm> = ({ data, technology }) => {
  const router = useRouter();
  const { toast } = useToast();

  const title = data ? "Save Changes" : "Create Project";

  const form = useForm<z.infer<typeof defaultProjectFormSchema>>({
    resolver: zodResolver(defaultProjectFormSchema),
    defaultValues: data
      ? { ...data, technology: data?.technology || [] }
      : {
          name: "",
          description: "",
          technology: [],
        },
  });

  const onSubmit = async (values: z.infer<typeof defaultProjectFormSchema>) => {
    try {
      console.log(values);
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
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="domain">Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter domain of your project" {...field} />
                  </FormControl>
                  <FormDescription className="text-red-800 ">{form.formState.errors.domain && ""}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="github">Github</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter github Link of your project" {...field} />
                  </FormControl>
                  <FormDescription className="text-red-800 ">{form.formState.errors.github && ""}</FormDescription>
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
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>{form.formState.errors.description && ""}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* check for selection of tech stacks */}

            <FormField
              control={form.control}
              name="technology"
              render={({field}) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel 
                    id="technology"
                    className="text-base">

                      Technologies
                    </FormLabel>
                    <FormDescription>Select technology Stack, Databases, Library, etc. that you used for this project.</FormDescription>
                  </div>
                  {technology.map((item) => (
                    <FormField
                      key={item.name}
                      control={form.control}
                      name="technology"
                      render={({ field }) => {
                        const isChecked = field.value?.some((tech) => tech.name === item.name);
                        return (
                          <FormItem key={item.name} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                              
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, { name: item.name }])
                                    : field.onChange(field.value?.filter((value) => value.name !== item.name));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

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
