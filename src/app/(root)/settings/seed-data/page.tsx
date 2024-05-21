import { createSyncTechnology } from '@/actions/technology'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SyncButton from "./sync-button";

const SeedData = () => {
  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Set default Tech stack project</CardTitle>
          <CardDescription>click below to set the technologies default data</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="border-t px-6 py-4">
          <SyncButton/>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeedData;
