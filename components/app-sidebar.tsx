"use client";

import {
  Calendar,
  Home,
  Inbox,
  PanelLeftIcon,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import AnimatedCollapsible from "./sidebar/animated-collapsibe";
import { ThemeToggle } from "./theme-toggler";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const { theme } = useTheme();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={state !== "collapsed" ? "hover:!bg-transparent " : ""}
            >
              {state === "collapsed" ? (
                <div className="flex items-center justify-center cursor-pointer ">
                  <PanelLeftIcon onClick={() => toggleSidebar()} />
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex items-center grow pointer-events-none gap-2">
                    <Home size={16} />
                    <span className="text-primary text-xl font-bold">
                      InvestIQ
                    </span>
                  </div>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => toggleSidebar()}
                    className="hover:!bg-sidebar-accent cursor-pointer"
                  >
                    <PanelLeftIcon />
                  </Button>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="!w-[calc(100%-8px)] mx-auto" />

      <SidebarContent className=" custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.title === "Home"}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <AnimatedCollapsible items={items} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="!w-[calc(100%-8px)] mx-auto" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="w-full flex items-center gap-2">
                <ThemeToggle
                  className={state === "collapsed" ? "w-full h-full" : ""}
                />
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
