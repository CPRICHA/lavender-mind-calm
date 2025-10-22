import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Lightbulb, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const DailyInspiration = () => {
  const cards = [
    {
      icon: BookOpen,
      title: "Daily Reflection",
      description: "Pause and ponder your day.",
      color: "bg-mint-light/40",
    },
    {
      icon: Lightbulb,
      title: "Mood Tips",
      description: "Small habits for a calmer mind.",
      color: "bg-pink-light/40",
    },
    {
      icon: Sprout,
      title: "Gratitude Prompts",
      description: "Find joy in the little things.",
      color: "bg-accent/40",
    },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8 text-burgundy"
        >
          Daily Inspiration
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-2xl">
                <div className={`h-40 ${card.color} flex items-center justify-center`}>
                  <card.icon className="w-14 h-14 text-burgundy" strokeWidth={1.5} />
                </div>
                <CardContent className="p-6 text-center bg-background">
                  <h3 className="text-lg font-semibold mb-2 text-burgundy">{card.title}</h3>
                  <p className="text-olive text-sm">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyInspiration;
