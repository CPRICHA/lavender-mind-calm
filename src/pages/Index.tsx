import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DailyInspiration from "@/components/DailyInspiration";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <Hero />
      <DailyInspiration />
      <Footer />
    </div>
  );
};

export default Index;
