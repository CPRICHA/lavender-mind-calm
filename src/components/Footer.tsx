import { Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-burgundy text-sm">
          Made with <span className="text-burgundy">❤️</span> for your mindful moments.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-burgundy/80 hover:bg-burgundy text-white">
            <Twitter className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-burgundy/80 hover:bg-burgundy text-white">
            <Facebook className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-burgundy/80 hover:bg-burgundy text-white">
            <Instagram className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
