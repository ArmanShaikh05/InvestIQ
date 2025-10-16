"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      className={cn("bg-background/80", className)}
    >
      {theme === "light" ? (
        <Moon className=" h-[1.2rem] w-[1.2rem] " />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] " />
      )}
    </Button>
  );
}
