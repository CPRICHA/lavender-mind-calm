import { motion } from "framer-motion";
import { Brain, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = ["Home", "Journal", "Mood Tracker", "About"];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">MindBank</span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/">
              <Button variant="secondary" className="rounded-full">
                Home
              </Button>
            </Link>
            <Link to="/journal">
              <Button variant="ghost" className="rounded-full">
                Journal
              </Button>
            </Link>
            <Link to="/mood-tracker">
              <Button variant="ghost" className="rounded-full">
                Mood Tracker
              </Button>
            </Link>
            <Button variant="ghost" className="rounded-full">
              About
            </Button>
          </div>

          {/* User Icon */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Smile className="w-6 h-6 text-primary" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
