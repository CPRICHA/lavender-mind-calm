import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DailyInspiration from "@/components/DailyInspiration";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-mint-light/20 overflow-hidden relative">
      {/* Decorative background circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-pink-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-mint-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/3 w-44 h-44 bg-accent/20 rounded-full blur-3xl" />
      
      {/* Main content container */}
      <div className="relative max-w-6xl mx-auto my-8 bg-background/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <Navbar />
        <div className="px-6">
          <Hero />
          <DailyInspiration />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
