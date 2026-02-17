import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-side-bar";
import AppHeader from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex flex-col min-h-screen w-full p-4 space-y-4">
        <div className="flex flex-row space-x-4 items-center">
          <SidebarTrigger />
          <AppHeader />
        </div>

        <hr />

        {children}
      </main>

      <Toaster />
    </SidebarProvider>
  );
}
