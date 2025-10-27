import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Home, 
  PenLine, 
  Palette, 
  Smile, 
  Sparkles, 
  Lock, 
  Download,
  Bold,
  Italic,
  Underline,
  Type,
  Highlighter,
  List,
  ListOrdered,
  Quote,
  Minus,
  Mic,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Journal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [content, setContent] = useState("");
  
  const sidebarItems = [
    { icon: PenLine, label: "Write", color: "text-primary" },
    { icon: Palette, label: "Style", color: "text-secondary" },
    { icon: Smile, label: "Emoji", color: "text-accent-foreground" },
    { icon: Sparkles, label: "Prompts", color: "text-primary" },
    { icon: Lock, label: "Privacy", color: "text-olive" },
    { icon: Download, label: "Export", color: "text-burgundy" },
  ];

  const prompts = [
    "What made you smile today?",
    "Describe a moment of peace you experienced",
    "What are you grateful for right now?",
    "What's on your mind at this moment?"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-2"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-medium">Journal</span>
        </div>
      </motion.div>

      {/* Daily Affirmation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="container mx-auto px-6 py-4"
      >
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/20 border-primary/20">
          <CardContent className="py-4 px-6">
            <p className="text-center text-primary font-medium flex items-center justify-center gap-2">
              💌 You are allowed to rest today
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6 flex gap-6 relative">
        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-24 left-4 z-50 bg-card shadow-lg rounded-full"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Left Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-64 bg-card/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-border/50 h-fit sticky top-24 md:relative fixed left-6 z-40"
            >
              <div className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-all group"
                  >
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Center Writing Area */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 min-w-0"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
            <CardHeader className="pb-4">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Bold className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Italic className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Underline className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Type className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Highlighter className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Smile className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Quote className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Minus className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-secondary/20 text-secondary">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="How are you feeling today? Let your thoughts flow..."
                className="min-h-[500px] bg-transparent border-none text-foreground placeholder:text-muted-foreground text-base resize-none focus-visible:ring-0 focus-visible:ring-offset-0 leading-relaxed"
              />
            </CardContent>
          </Card>
        </motion.main>

        {/* Right Panel */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:block w-80 space-y-6"
        >
          {/* Mood Insight Card */}
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-xl border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Mood Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Detected Emotion</p>
                <p className="text-xl font-semibold text-primary">Calm & Hopeful</p>
              </div>
              <p className="text-sm text-foreground/80">
                Your words reflect a peaceful mindset today. Keep nurturing this positive energy! ✨
              </p>
              <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Emotion
              </Button>
            </CardContent>
          </Card>

          {/* Inspiration Card */}
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-secondary flex items-center gap-2">
                💫 Need Inspiration?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {prompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => setContent(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-accent/20 hover:bg-accent/30 transition-colors text-sm text-foreground/80 hover:text-foreground"
                >
                  {prompt}
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </motion.aside>
      </div>
    </div>
  );
};

export default Journal;
