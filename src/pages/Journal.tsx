import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
  PenLine, 
  Palette, 
  Smile, 
  Sparkles, 
  Lock, 
  Download,
  Mic,
  ChevronRight,
  Menu,
  X,
  Square,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const Journal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [content, setContent] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const quillRef = useRef<ReactQuill>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  
  const sidebarItems = [
    { icon: PenLine, label: "Write", action: () => quillRef.current?.focus() },
    { icon: Palette, label: "Style", action: () => {} },
    { icon: Smile, label: "Emoji", action: () => setEmojiPickerOpen(!emojiPickerOpen) },
    { icon: Sparkles, label: "Prompts", action: () => insertPrompt() },
    { icon: Lock, label: "Privacy", action: () => toast({ title: "🔒 Entry marked as private" }) },
    { icon: Download, label: "Export", action: () => exportEntry() },
  ];

  const prompts = [
    "What made you smile today?",
    "Describe a moment of peace you experienced",
    "What are you grateful for right now?",
    "What's on your mind at this moment?"
  ];

  const lavenderColors = ["#756AB6", "#AC87C5", "#E0AED0", "#FFE5E5", "#CAE0BC", "#EAFAEA", "#6E8E59"];

  // Quill modules with custom toolbar
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, false] }],
        [{ color: lavenderColors }, { background: lavenderColors }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "bold", "italic", "underline",
    "header", "size", "color", "background",
    "list", "bullet", "blockquote", "code-block"
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const selection = quill.getSelection();
        if (!selection) return;

        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            quill.format("bold", !quill.getFormat(selection).bold);
            break;
          case "i":
            e.preventDefault();
            quill.format("italic", !quill.getFormat(selection).italic);
            break;
          case "u":
            e.preventDefault();
            quill.format("underline", !quill.getFormat(selection).underline);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const selection = quill.getSelection();
      const index = selection ? selection.index : quill.getLength();
      quill.insertText(index, emojiData.emoji);
      quill.setSelection(index + emojiData.emoji.length, 0);
    }
    setEmojiPickerOpen(false);
  };

  const insertPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const currentContent = quill.getText().trim();
      const newContent = currentContent ? `${currentContent}\n\n${randomPrompt}` : randomPrompt;
      quill.setText(newContent);
      quill.setSelection(quill.getLength(), 0);
    }
  };

  const exportEntry = () => {
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `journal-entry-${new Date().toISOString().split("T")[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "📄 Entry exported successfully!" });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast({ title: "🎙️ Recording started..." });
    } catch (error) {
      toast({ title: "❌ Microphone access denied", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({ title: "⏹️ Recording stopped" });
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
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-all group"
                  >
                    <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
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
            <CardHeader className="pb-4 space-y-4">
              {/* Editor Toolbar */}
              <div className="journal-editor">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="How are you feeling today? Let your thoughts flow..."
                  className="min-h-[400px]"
                />
              </div>

              {/* Additional Controls */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/50">
                <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-lg hover:bg-primary/20">
                      <Smile className="w-4 h-4 mr-2" />
                      Emoji
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 border-0" align="start">
                    <EmojiPicker onEmojiClick={onEmojiClick} width="100%" />
                  </PopoverContent>
                </Popover>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`rounded-lg ${isRecording ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "hover:bg-secondary/20 text-secondary"}`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Record Audio
                    </>
                  )}
                </Button>

                {audioURL && (
                  <div className="flex items-center gap-2 ml-auto">
                    <audio controls src={audioURL} className="h-8" />
                  </div>
                )}
              </div>
            </CardHeader>
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
