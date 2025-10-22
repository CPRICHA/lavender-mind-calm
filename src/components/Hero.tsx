import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      {/* Organic Blob Background */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-mint-light/60 via-accent/40 to-pink-light/60 backdrop-blur-sm">
        {/* Decorative organic shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-mint/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-light/30 rounded-full blur-3xl" />
        
        <div className="relative px-8 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Headline */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-burgundy leading-tight">
                Your space to reflect, feel, and grow{" "}
                <span className="inline-block">🌿</span>
              </h1>
              <p className="text-base md:text-lg text-olive max-w-2xl mx-auto">
                MindBank helps you understand your emotions and build the more mindful you
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link to="/journal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-burgundy/90 to-burgundy/70 hover:from-burgundy hover:to-burgundy/80 text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Writing
                </Button>
              </Link>
              <Link to="/mood-tracker">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Track Emotions
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
