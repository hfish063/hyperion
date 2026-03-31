import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
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
      <Button variant={"outline"} onClick={toggleTheme} size={"icon"}>
        {theme == "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </div>
  );
}
