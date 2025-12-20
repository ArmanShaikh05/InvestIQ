import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Calendar, ChevronRight, LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
}[];

type AnimatedCollapsibleProps = {
  items: MenuItem;
  title?: string;
  icon?: LucideIcon;
};

const AnimatedCollapsible = ({
  items,
  title = "Analytics",
  icon: Icon = Calendar,
}: AnimatedCollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton asChild>
            <div className="w-full flex items-center justify-between">
              <Link href={"#"} className="flex items-center gap-2">
                <Icon size={17} />
                <span>{title}</span>
              </Link>
              <ChevronRight
                className={`ml-auto size-4 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {/* ✨ Animated content starts here */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="overflow-hidden"
            >
              <SidebarMenuSub>
                {items.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton
                      asChild
                      // isActive={item.title === "Home"}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default AnimatedCollapsible;
