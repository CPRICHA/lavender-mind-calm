import { motion } from "framer-motion";
import { Heart, Brain, Sparkles, Shield, TrendingUp, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Emotion-Aware AI",
      description: "Detects emotional tone in your writing — calm, joy, stress, or gratitude.",
      color: "bg-accent/20",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Mood Reflections",
      description: "See how your emotional world changes over time with beautiful visuals.",
      color: "bg-pink-light/30",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Private & Safe",
      description: "Your data stays yours. No ads, no sharing — just you and your thoughts.",
      color: "bg-mint-light/30",
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Designed to Soothe",
      description: "Lavender tones, calming UI, and affirmations to keep your space peaceful.",
      color: "bg-accent/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-mint-light/20 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-pink-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-mint-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/3 w-44 h-44 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Main content container */}
      <div className="relative max-w-6xl mx-auto my-8 bg-background/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <Navbar />
        
        <div className="px-6 pb-12">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="relative">
                <Heart className="w-12 h-12 text-primary animate-pulse" fill="currentColor" />
                <Brain className="w-8 h-8 text-accent absolute -right-2 -top-2" />
              </div>
            </motion.div>
            
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-burgundy mb-4">
              Welcome to MindBank
            </h1>
            <p className="text-xl md:text-2xl text-olive mb-3 font-light">
              A space to breathe, feel, and heal.
            </p>
            <p className="text-burgundy/80 max-w-2xl mx-auto mb-6 leading-relaxed">
              MindBank is your calm corner of the internet — a mindful journal powered by emotion-aware AI.
              Every word you write is safely stored, gently analyzed, and lovingly reflected back to you as patterns of your growth, resilience, and joy.
            </p>
            
            <Link to="/journal">
              <Button 
                size="lg" 
                className="rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300 text-white font-medium px-8"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Writing
              </Button>
            </Link>
          </motion.section>

          {/* Philosophy Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-4xl font-bold text-burgundy text-center mb-6">
                Because feelings deserve a safe home.
              </h2>
              <div className="space-y-4 text-burgundy/80 leading-relaxed">
                <p>
                  We believe that your thoughts aren't just words — they're data points of your emotional world.
                  MindBank helps you see your moods unfold over time, offering quiet insights without judgment.
                </p>
                <p>
                  Your emotions become colors, trends, and reflections that help you understand yourself better.
                </p>
              </div>
              
              {/* Decorative wave */}
              <div className="mt-12 h-32 bg-gradient-to-r from-accent/30 via-pink-light/30 to-mint-light/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <div className="w-full h-16 opacity-40">
                  <svg viewBox="0 0 1200 100" className="w-full h-full">
                    <path 
                      d="M0,50 Q300,10 600,50 T1200,50" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      className="text-burgundy"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4"
          >
            <h2 className="font-playfair text-4xl font-bold text-burgundy text-center mb-12">
              What Makes MindBank Different
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${feature.color} border-none backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/50 rounded-xl text-burgundy">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-burgundy text-lg mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-burgundy/70 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Vision Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-4xl font-bold text-burgundy mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-olive mb-4 font-light italic">
                "We want to make mental wellness feel beautiful, not clinical."
              </p>
              <p className="text-burgundy/80 leading-relaxed mb-4">
                MindBank began with a simple idea — to blend emotion science with art and technology.
              </p>
              <p className="text-burgundy/80 leading-relaxed">
                Every keystroke is a whisper of your story — and we're here to listen, gently.
              </p>
            </div>
          </motion.section>

          {/* Closing Quote */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12 px-4"
          >
            <Card className="bg-gradient-to-br from-accent/20 to-pink-light/20 border-none backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <p className="font-dancing text-2xl md:text-3xl text-burgundy mb-3 italic">
                  "Journaling is how the soul learns to speak."
                </p>
                <p className="text-olive font-medium">
                  — MindBank Team
                </p>
              </CardContent>
            </Card>
          </motion.section>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default About;