"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  image: z.string().min(1, "Uplaod atleast one image").array(),
});
export default function Cloudinary() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  //  const onUploadAdded = (result: any) => {
  //   console.log(result.);

  //  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <div>
                  
                  <div className="text-blue-950">
                  {field.value?.map((image) => <>{image}</>)}
                  </div>
                  <CldUploadWidget
                    options={{sources:["local"]}}
                    onUploadAdded={(result, { widget }) => {
                      console.log(result?.info)
                      widget.close();
                    }}
                   
                    uploadPreset="qmfqcrr1"
                  >
                    {({ open }) => {
                      return (
                        <Button 
                        disabled={form.formState.isSubmitting} 
                        onClick={() => open()}>
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Upload an Image
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </FormControl>
              <FormDescription>Select atleast one Image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
