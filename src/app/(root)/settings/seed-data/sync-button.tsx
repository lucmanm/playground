"use client";
import { createSyncTechnology } from "@/actions/technology";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import React from "react";
const SyncData = async () => {
  const result = await createSyncTechnology();
  
  if (result?.message) {
    toast({
      variant: "success",
      description: result.message,
    });
  }else{
    toast({
        variant: "destructive",
        title: "SYNCRONIZATION_ERROR",
        description: result?.message
    })
  }
};
export default function SyncButton() {
  return <Button onClick={SyncData}>Sync Now</Button>;
}
