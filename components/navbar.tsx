import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <div className="border w-full mb-2 px-4 py-2 rounded-xl flex items-center justify-between bg-card">
      <SidebarTrigger />

      <div>
        {/* Switch to Pro mode */}

        {/* User avatar */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
