import { motion } from "framer-motion";
import { Home, BarChart3, Pencil, Settings, Download, Smile, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Journal = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-pink-light rounded-full flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
              <span className="text-xl font-bold text-burgundy">MindBank</span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link to="/">
                <Button variant="secondary" className="rounded-full">
                  Home
                </Button>
              </Link>
              <Link to="/journal">
                <Button variant="secondary" className="rounded-full">
                  Journal
                </Button>
              </Link>
              <Button variant="ghost" className="rounded-full">
                Mood Tracker
              </Button>
              <Button variant="ghost" className="rounded-full">
                About
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full border-2 border-pink-light">
              <Smile className="w-6 h-6 text-burgundy" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-48 bg-mint/30 backdrop-blur-sm p-6 flex flex-col gap-8"
        >
          <Link to="/">
            <button className="flex flex-col items-center gap-2 text-olive hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-mint-light rounded-2xl flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Home</span>
            </button>
          </Link>

          <button className="flex flex-col items-center gap-2 text-olive hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-mint-light rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">Journal</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-olive hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-mint-light rounded-2xl flex items-center justify-center">
              <Pencil className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">Mood Tracker</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-burgundy hover:opacity-80 transition-opacity mt-auto">
            <div className="w-12 h-12 bg-pink-light rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
          </button>
        </motion.aside>

        {/* Center Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 p-8 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto">
            {/* Toolbar */}
            <div className="flex items-center gap-4 mb-6">
              <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors">
                <span className="font-semibold">A</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-pink-light hover:bg-pink-light/80 flex items-center justify-center text-burgundy transition-colors">
                <span className="font-semibold">A</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <span className="text-xl">🌐</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <span className="text-xl">⭐</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <span className="text-xl">↩️</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <span className="text-xl">↪️</span>
              </button>
            </div>

            {/* Text Editor Area */}
            <div className="bg-pink-light/20 rounded-3xl p-8 min-h-[500px] relative">
              <button className="absolute top-6 left-6 w-8 h-8 rounded-full bg-burgundy hover:bg-burgundy/80 flex items-center justify-center text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>

              <div className="mt-12">
                <Textarea
                  placeholder="How nor youe feeling today?"
                  className="min-h-[400px] bg-transparent border-none text-olive placeholder:text-olive/60 text-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {/* Decorative circles */}
              <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/30" />
              <div className="absolute top-24 right-20 w-20 h-20 rounded-full bg-pink-light/40" />
            </div>
          </div>
        </motion.main>

        {/* Right Sidebar */}
        <motion.aside
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-80 p-8 flex flex-col gap-6"
        >
          <div className="flex gap-2 ml-auto">
            <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
              <Smile className="w-5 h-5 text-primary" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
              <Download className="w-5 h-5 text-primary" />
            </button>
          </div>

          <div className="bg-card rounded-3xl p-6 mt-auto">
            <h3 className="text-lg font-semibold text-burgundy mb-4">
              Today's Mood Summary
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Detected Emotion:</p>
                <p className="text-xl font-semibold text-burgundy">Calm / Joy</p>
              </div>
              <p className="text-sm text-olive flex items-center gap-2">
                You sound hopeful today <span className="text-lg">✨</span>
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default Journal;
