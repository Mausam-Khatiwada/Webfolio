import { Terminal, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ModeToggleProps {
  mode: "ui" | "cli";
  onModeChange: (mode: "ui" | "cli") => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={mode === "ui" ? "default" : "ghost"}
        size="icon"
        onClick={() => onModeChange("ui")}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Layout className="h-5 w-5" />
        </motion.div>
      </Button>
      <Button
        variant={mode === "cli" ? "default" : "ghost"}
        size="icon"
        onClick={() => onModeChange("cli")}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Terminal className="h-5 w-5" />
        </motion.div>
      </Button>
    </div>
  );
}
