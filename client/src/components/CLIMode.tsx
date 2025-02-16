import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
  command: string;
  output: string;
}

export function CLIMode() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    let output = "";

    switch (command) {
      case "help":
        output = `Available commands:
- about: Show information about me
- projects: View my projects
- skills: View my skills
- contact: Contact form
- theme toggle: Switch theme
- clear: Clear terminal
- help: Show this help message`;
        break;
      case "about":
        setLocation("/");
        output = "Navigating to About page...";
        break;
      case "projects":
        setLocation("/projects");
        output = "Navigating to Projects page...";
        break;
      case "skills":
        setLocation("/skills");
        output = "Navigating to Skills page...";
        break;
      case "contact":
        setLocation("/contact");
        output = "Navigating to Contact page...";
        break;
      case "theme toggle":
        document.documentElement.classList.toggle("dark");
        output = "Theme toggled!";
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground p-4 font-mono pt-20 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="mb-4 text-sm md:text-base"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to the CLI mode! Type 'help' for available commands.
      </motion.div>

      <AnimatePresence mode="popLayout">
        {history.map((entry, i) => (
          <motion.div
            key={i}
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, delay: i * 0.1 }}
          >
            <motion.p 
              className="text-primary text-sm md:text-base break-words"
              whileHover={{ scale: 1.01 }}
            >
              Mausam@Terminal:-$ {entry.command}
            </motion.p>
            <motion.p 
              className="whitespace-pre-wrap text-sm md:text-base pl-4 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {entry.output}
            </motion.p>
          </motion.div>
        ))}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex items-center">
        <motion.span 
          className="text-primary mr-2 text-sm md:text-base whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
        >
          Mausam@Terminal:-$
        </motion.span>
        <motion.input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm md:text-base min-w-0"
          whileFocus={{ scale: 1.01 }}
          autoFocus
        />
      </form>
    </motion.div>
  );
}