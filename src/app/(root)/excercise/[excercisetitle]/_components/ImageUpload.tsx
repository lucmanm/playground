"use client";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

type TImageUplaod = {
  disabled?: boolean;
  value: string[];
  onChange: (value: string) => void;
};

export default function ImageUplaod({ value, disabled, onChange }: TImageUplaod) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSuccess = (result: any) => {
    console.log(result.info.url);
    onChange(result.info.file.name);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="text-blue-950">
        {value.map((data) => (
          <div key={data}>
            <Image src={data} alt={data} fill/>
          </div>
        ))}
      </div>
      <CldUploadWidget
        options={{ sources: ["local"] }}
        onSuccess={onSuccess}
        uploadPreset="o8kpzvok"
      >
        {({ open }) => {
          return (
            <Button variant="outline" type="button" disabled={disabled} onClick={() => open()}>
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
