import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Hand } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const inspirationCards = [
  {
    icon: BookOpen,
    title: "Daily Reflection",
    description: "Pause and ponder your day.",
    bgColor: "bg-mint/40",
    delay: 0.2,
  },
  {
    icon: Lightbulb,
    title: "Mood Tips",
    description: "Small habits for a calmer mind.",
    bgColor: "bg-pink-light/60",
    delay: 0.4,
  },
  {
    icon: Hand,
    title: "Gratitude Prompts",
    description: "Find joy in the little things.",
    bgColor: "bg-accent/40",
    delay: 0.6,
  },
];

const DailyInspiration = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center md:text-left">
          Daily Inspiration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inspirationCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.delay }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-card">
                <CardContent className="p-8 space-y-6">
                  {/* Icon Section */}
                  <div className={`${card.bgColor} rounded-2xl p-8 flex items-center justify-center`}>
                    <card.icon className="w-16 h-16 text-foreground stroke-[1.5]" />
                  </div>

                  {/* Text Section */}
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute right-0 top-1/2 w-64 h-64 bg-secondary rounded-full blur-3xl -z-10"
      />
    </section>
  );
};

export default DailyInspiration;
