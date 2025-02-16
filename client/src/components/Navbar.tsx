import { ThemeToggle } from "./ThemeToggle";
import { ModeToggle } from "./ModeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  mode: "ui" | "cli";
  onModeChange: (mode: "ui" | "cli") => void;
}

export function Navbar({ mode, onModeChange }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    console.log('Scrolling to section with ID:', id);
    const section = document.getElementById(id);
    if (section) {
      console.log('Section found:', section);
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log('Section not found');
    }
  };
  
  

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-background/95 backdrop-blur z-50 border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.a 
          className="text-xl font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('home')}
        >
          M  .  K
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink  onClick={() => scrollToSection('projects')}>Projects</NavLink>
          <NavLink onClick={() => scrollToSection('skills')}>Skills</NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t bg-background/95 backdrop-blur"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <NavLink onClick={() => {  scrollToSection('projects');  }}>Projects</NavLink>
              <NavLink onClick={() => { scrollToSection('skills'); }}>Skills</NavLink>
              <NavLink onClick={() => { scrollToSection('contact'); }}>Contact</NavLink>
              <div className="flex items-center space-x-4 pt-2">
                <ThemeToggle />
                <ModeToggle mode={mode} onModeChange={(m) => {
                  onModeChange(m);
                  setIsMenuOpen(false);
                }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.a 
      className="hover:text-primary cursor-pointer block"
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.a>
  );
}