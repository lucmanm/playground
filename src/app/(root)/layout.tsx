import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./_root-components/header";
import Sidebar from "./_root-components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px] ">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
