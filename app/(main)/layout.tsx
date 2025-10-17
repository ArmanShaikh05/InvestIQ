import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-2 w-full min-h-screen">
          <Navbar />
          {children}
        </main>
        <ShootingStars className="-z-10" />
        <StarsBackground className="-z-10"/>
      </SidebarProvider>
    </>
  );
}
