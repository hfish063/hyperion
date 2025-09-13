import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return undefined;
  }

  function toggleTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <div className="flex flex-row space-x-4 items-center">
      {theme == "light" ? <MoonIcon /> : <SunIcon />}
      <Switch
        checked={theme == "dark" ? true : false}
        onCheckedChange={toggleTheme}
      />
    </div>
  );
}
