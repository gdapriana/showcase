"use client";

import { Button } from "@/components/ui/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button size="icon" variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <SunMoon />
    </Button>
  );
}
