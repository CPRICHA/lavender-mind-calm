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
      className="mb-6"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-burgundy">MindBank</span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button variant="secondary" className="rounded-full bg-pink-light/50 text-burgundy hover:bg-pink-light/70">
                Home
              </Button>
            </Link>
            <Link to="/journal">
              <Button variant="ghost" className="rounded-full text-burgundy hover:bg-pink-light/30">
                Journal
              </Button>
            </Link>
            <Link to="/mood-tracker">
              <Button variant="ghost" className="rounded-full text-burgundy hover:bg-pink-light/30">
                Mood Tracker
              </Button>
            </Link>
            <Button variant="ghost" className="rounded-full text-burgundy hover:bg-pink-light/30">
              About
            </Button>
          </div>

          {/* User Icon */}
          <Button variant="ghost" size="icon" className="rounded-full border-2 border-burgundy/20 hover:bg-pink-light/30">
            <Smile className="w-5 h-5 text-burgundy" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
