import { motion } from "framer-motion";
import { Sparkles, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint-light via-accent/30 to-pink-light" />
      
      {/* Decorative Circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 left-10 w-32 h-32 bg-mint rounded-full blur-2xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-pink-light rounded-full blur-2xl"
      />

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Your space to reflect, feel, and grow{" "}
              <span className="inline-block">🌱</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              MindBank helps you understand your emotions and build the more mindful you
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-burgundy/80 to-burgundy hover:from-burgundy hover:to-burgundy/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <PenLine className="w-5 h-5 mr-2" />
              Start Writing
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Track Emotions
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
