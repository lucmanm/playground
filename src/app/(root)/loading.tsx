import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid px-4 gap-x-4 w-full space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <section className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({length: 4}).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))}
        </section>
      </div>
    </section>
  );
}
