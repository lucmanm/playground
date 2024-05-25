import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <section className="container lg:my-32 border-none">
      <div>
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/6" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/6" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="h-6 w-full" />
        </form>
      </div>
    </section>
  );
}
