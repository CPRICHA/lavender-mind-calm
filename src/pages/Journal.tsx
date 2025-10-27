import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
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
  X,
  Save,
  MicOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EmojiPicker from "emoji-picker-react";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const affirmations = [
  "💌 You are allowed to rest today",
  "🌸 Your feelings are valid and important",
  "✨ Every word you write is a step toward healing",
  "🌿 Be gentle with yourself today",
  "💜 You are doing better than you think"
];

const moodEmojis = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😡", label: "Angry", value: "angry" },
  { emoji: "😍", label: "Grateful", value: "grateful" }
];

const Journal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [emotionAnalysis, setEmotionAnalysis] = useState({ emotion: "Calm & Hopeful", summary: "Your words reflect a peaceful mindset today. Keep nurturing this positive energy! ✨" });
  const [affirmation, setAffirmation] = useState(affirmations[0]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const quillRef = useRef<ReactQuill>(null);
  const { toast } = useToast();

  const prompts = [
    "What made you smile today?",
    "Describe a moment of peace you experienced",
    "What are you grateful for right now?",
    "What's on your mind at this moment?"
  ];

  // Random affirmation on load
  useEffect(() => {
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(randomAffirmation);
    
    // Load saved content
    const saved = localStorage.getItem("journal_draft");
    if (saved) {
      setContent(saved);
    }
  }, []);

  // Auto-save every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        localStorage.setItem("journal_draft", content);
        setLastSaved(new Date());
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [content]);

  // Mock emotion analysis
  const analyzeEmotion = useCallback(() => {
    const text = content.replace(/<[^>]*>/g, '').toLowerCase();
    
    let emotion = "Calm 💜";
    let summary = "You sound peaceful and reflective.";

    if (text.includes("happy") || text.includes("joy") || text.includes("great") || text.includes("love")) {
      emotion = "Joyful 😊";
      summary = "Your words radiate happiness and positivity!";
    } else if (text.includes("sad") || text.includes("upset") || text.includes("hurt")) {
      emotion = "Melancholic 😔";
      summary = "It's okay to feel this way. Your emotions are valid.";
    } else if (text.includes("angry") || text.includes("frustrated") || text.includes("mad")) {
      emotion = "Frustrated 😡";
      summary = "These feelings are natural. Let them out safely here.";
    } else if (text.includes("grateful") || text.includes("thankful") || text.includes("blessed")) {
      emotion = "Grateful 😍";
      summary = "Gratitude is a beautiful emotion. Keep nurturing it!";
    } else if (text.includes("anxious") || text.includes("worried") || text.includes("stress")) {
      emotion = "Anxious 😰";
      summary = "Take a deep breath. You're safe here.";
    }

    setEmotionAnalysis({ emotion, summary });
    toast({
      title: "Emotion Analyzed",
      description: `Detected: ${emotion}`,
    });
  }, [content, toast]);

  // Voice to text
  const startVoiceRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "🎙️ Listening...",
        description: "Speak now. Click mic again to stop.",
      });
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      
      setContent(prev => prev + " " + transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Error",
        description: "Could not capture voice.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
    }
  }, [isListening, toast]);

  // Export to PDF
  const exportToPDF = useCallback(() => {
    if (isPrivate) {
      const confirm = window.confirm("This entry is marked private. Export anyway?");
      if (!confirm) return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(117, 106, 182); // #756AB6
    doc.text("MindBank Journal Entry", margin, margin);
    
    // Date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(new Date().toLocaleDateString(), margin, margin + 10);
    
    // Mood
    if (selectedMood) {
      doc.text(`Mood: ${selectedMood}`, margin, margin + 17);
    }

    // Content
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const text = content.replace(/<[^>]*>/g, '\n');
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, margin + 30);

    doc.save(`journal_${new Date().getTime()}.pdf`);
    
    toast({
      title: "Exported!",
      description: "Your journal entry has been saved as PDF.",
    });
  }, [content, isPrivate, selectedMood, toast]);

  // Save reflection to localStorage
  const saveReflection = useCallback(() => {
    const entry = {
      content,
      mood: selectedMood,
      emotion: emotionAnalysis.emotion,
      timestamp: new Date().toISOString(),
      isPrivate
    };

    const saved = JSON.parse(localStorage.getItem("journal_entries") || "[]");
    saved.push(entry);
    localStorage.setItem("journal_entries", JSON.stringify(saved));
    localStorage.removeItem("journal_draft");

    toast({
      title: "💾 Saved!",
      description: "Your reflection has been stored safely.",
    });

    setContent("");
    setSelectedMood("");
  }, [content, selectedMood, emotionAnalysis, isPrivate, toast]);

  // Toolbar handlers
  const handleFormat = (format: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (!range) return;

    switch(format) {
      case 'bold':
        quill.format('bold', !quill.getFormat(range).bold);
        break;
      case 'italic':
        quill.format('italic', !quill.getFormat(range).italic);
        break;
      case 'underline':
        quill.format('underline', !quill.getFormat(range).underline);
        break;
      case 'list':
        quill.format('list', 'bullet');
        break;
      case 'ordered':
        quill.format('list', 'ordered');
        break;
      case 'blockquote':
        quill.format('blockquote', !quill.getFormat(range).blockquote);
        break;
    }
  };

  const insertPrompt = (prompt: string) => {
    setContent(prev => prev + `<p>${prompt}</p>`);
    toast({
      title: "Prompt Added",
      description: "Start writing your thoughts!",
    });
  };

  const sidebarItems = [
    { 
      icon: PenLine, 
      label: "Write", 
      color: "text-primary",
      action: () => quillRef.current?.focus()
    },
    { 
      icon: Palette, 
      label: "Style", 
      color: "text-secondary",
      action: () => setShowStylePanel(!showStylePanel)
    },
    { 
      icon: Smile, 
      label: "Emoji", 
      color: "text-accent-foreground",
      action: () => setShowEmojiPicker(!showEmojiPicker)
    },
    { 
      icon: Sparkles, 
      label: "Prompts", 
      color: "text-primary",
      action: () => insertPrompt(prompts[Math.floor(Math.random() * prompts.length)])
    },
    { 
      icon: Lock, 
      label: "Privacy", 
      color: "text-olive",
      action: () => {
        setIsPrivate(!isPrivate);
        toast({
          title: isPrivate ? "🔓 Public" : "🔒 Private",
          description: isPrivate ? "Entry is now public" : "Entry is now private",
        });
      }
    },
    { 
      icon: Download, 
      label: "Export", 
      color: "text-burgundy",
      action: exportToPDF
    },
  ];

  const modules = {
    toolbar: false, // We're using custom toolbar
    keyboard: {
      bindings: {
        bold: {
          key: 'B',
          ctrlKey: true,
          handler: () => handleFormat('bold')
        },
        italic: {
          key: 'I',
          ctrlKey: true,
          handler: () => handleFormat('italic')
        },
        underline: {
          key: 'U',
          ctrlKey: true,
          handler: () => handleFormat('underline')
        }
      }
    }
  };

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
              {affirmation}
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
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-all group relative"
                  >
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    {item.label === "Privacy" && isPrivate && (
                      <Lock className="w-3 h-3 ml-auto text-olive" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Auto-save indicator */}
              {lastSaved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-xs text-muted-foreground text-center"
                >
                  Last saved: {lastSaved.toLocaleTimeString()}
                </motion.div>
              )}
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg hover:bg-primary/20"
                  onClick={() => handleFormat('bold')}
                  title="Bold (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg hover:bg-primary/20"
                  onClick={() => handleFormat('italic')}
                  title="Italic (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg hover:bg-primary/20"
                  onClick={() => handleFormat('underline')}
                  title="Underline (Ctrl+U)"
                >
                  <Underline className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                
                <Popover open={showStylePanel} onOpenChange={setShowStylePanel}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                      <Type className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Text Size</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          const quill = quillRef.current?.getEditor();
                          quill?.format('size', 'small');
                        }}>Small</Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          const quill = quillRef.current?.getEditor();
                          quill?.format('size', false);
                        }}>Normal</Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          const quill = quillRef.current?.getEditor();
                          quill?.format('size', 'large');
                        }}>Large</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                  <Highlighter className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                
                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/20">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 border-0">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        const quill = quillRef.current?.getEditor();
                        const range = quill?.getSelection();
                        if (range) {
                          quill?.insertText(range.index, emojiData.emoji);
                        }
                        setShowEmojiPicker(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg hover:bg-primary/20"
                  onClick={() => handleFormat('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg hover:bg-primary/20"
                  onClick={() => handleFormat('ordered')}
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg hover:bg-primary/20"
                  onClick={() => handleFormat('blockquote')}
                >
                  <Quote className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg hover:bg-primary/20"
                  onClick={() => {
                    const quill = quillRef.current?.getEditor();
                    const range = quill?.getSelection();
                    if (range) {
                      quill?.insertText(range.index, '\n---\n');
                    }
                  }}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-lg hover:bg-secondary/20 ${isListening ? 'text-secondary animate-pulse' : 'text-secondary'}`}
                  onClick={startVoiceRecognition}
                  title="Voice to text"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>

              {/* Mood Selector */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Mood:</span>
                {moodEmojis.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.label)}
                    className={`text-2xl hover:scale-125 transition-transform ${
                      selectedMood === mood.label ? 'scale-125 drop-shadow-lg' : 'opacity-50'
                    }`}
                    title={mood.label}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="How are you feeling today? Let your thoughts flow..."
                className="journal-editor"
                style={{
                  minHeight: '500px',
                  border: 'none',
                  background: 'transparent'
                }}
              />
              
              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={saveReflection}
                  className="rounded-xl bg-primary hover:bg-primary/90"
                  disabled={!content}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Reflection
                </Button>
              </div>
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
                <p className="text-xl font-semibold text-primary">{emotionAnalysis.emotion}</p>
              </div>
              <p className="text-sm text-foreground/80">
                {emotionAnalysis.summary}
              </p>
              <Button 
                onClick={analyzeEmotion}
                className="w-full rounded-xl bg-primary hover:bg-primary/90"
                disabled={!content}
              >
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
                  onClick={() => insertPrompt(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-accent/20 hover:bg-accent/30 transition-colors text-sm text-foreground/80 hover:text-foreground"
                >
                  {prompt}
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </motion.aside>
      </div>

      <style>{`
        .journal-editor .ql-container {
          border: none !important;
          font-size: 16px;
          font-family: inherit;
        }
        .journal-editor .ql-editor {
          min-height: 500px;
          padding: 0;
          color: hsl(var(--foreground));
        }
        .journal-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }
        .journal-editor .ql-editor p {
          margin-bottom: 1em;
        }
        .journal-editor .ql-editor strong {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Journal;