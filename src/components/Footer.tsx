import { motion } from "framer-motion";
import { Heart, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-pink-light/30 border-t border-border mt-20"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Footer Text */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-5 h-5 text-burgundy fill-burgundy" />
            <span>for your mindful moments.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-burgundy/10 hover:bg-burgundy/20 text-burgundy"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-burgundy/10 hover:bg-burgundy/20 text-burgundy"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-burgundy/10 hover:bg-burgundy/20 text-burgundy"
            >
              <Instagram className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
