import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ToggleToProMode from "./pro-mode-toggle";
import { LayoutDashboard } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <div className="w-full mb-2 px-4 py-2 flex flex-col gap-2">
      <div className=" w-full flex items-center justify-between ">
        <div className="hidden sm:flex items-center gap-2">
          <LayoutDashboard />
          <h1 className="text-3xl">Dashboard</h1>
        </div>
        <SidebarTrigger className="sm:hidden"  />

        <div className="flex items-center gap-4">
          {/* Switch to Pro mode */}
          <ToggleToProMode />

          {/* User avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Breadcrumb className="hidden sm:flex">
        <BreadcrumbList className="text-xs text-muted-foreground/50 ">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Navbar;
