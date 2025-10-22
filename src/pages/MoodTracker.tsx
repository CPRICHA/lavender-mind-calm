import { motion } from "framer-motion";
import { Clock, Lightbulb, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MoodTracker = () => {
  const moodData = [
    { day: "Mon", joy: 2, calm: 3, neutral: 2, sadness: 1 },
    { day: "Tue", joy: 2.5, calm: 3.2, neutral: 2.3, sadness: 1.2 },
    { day: "Wed", joy: 3, calm: 3.5, neutral: 2.5, sadness: 1.5 },
    { day: "Thu", joy: 4, calm: 4, neutral: 3, sadness: 2 },
    { day: "Fri", joy: 3.5, calm: 3.8, neutral: 2.8, sadness: 1.8 },
    { day: "Sat", joy: 4.5, calm: 4.3, neutral: 3.2, sadness: 2.2 },
    { day: "Sun", joy: 5, calm: 4.8, neutral: 3.5, sadness: 2.5 },
  ];

  const suggestions = [
    {
      icon: Clock,
      title: "Try journaling at the same time daily",
      bg: "bg-mint/40",
      iconBg: "bg-mint-light",
    },
    {
      icon: Lightbulb,
      title: "Celebrate your joyful days — small wins matter! ✨",
      bg: "bg-pink-light/40",
      iconBg: "bg-pink-light",
    },
    {
      icon: Search,
      title: "Notice repeating moods and what triggers them",
      bg: "bg-primary/20",
      iconBg: "bg-primary/30",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto space-y-12"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="text-4xl">🌈</div>
            <h1 className="text-4xl md:text-5xl font-bold text-burgundy">
              Your Mood Journey
            </h1>
          </div>

          {/* Mood Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 bg-card/60 backdrop-blur-sm border-2 border-border rounded-3xl">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={moodData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="joyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#CAE0BC" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#CAE0BC" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="calmGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E0AED0" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#E0AED0" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFE5E5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FFE5E5" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="sadnessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#AC87C5" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#AC87C5" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.3} />
                    <XAxis
                      dataKey="day"
                      stroke="#6E8E59"
                      style={{ fontSize: "14px", fontWeight: 500 }}
                    />
                    <YAxis
                      stroke="#6E8E59"
                      style={{ fontSize: "14px", fontWeight: 500 }}
                      ticks={[0, 1, 2, 3, 4, 5]}
                      domain={[0, 5]}
                      label={{
                        value: "Joy",
                        angle: 0,
                        position: "insideTopLeft",
                        offset: 20,
                        style: { fill: "#6E8E59", fontSize: "14px" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #E0AED0",
                        borderRadius: "12px",
                        padding: "8px 12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="joy"
                      stroke="#CAE0BC"
                      strokeWidth={2}
                      fill="url(#joyGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="calm"
                      stroke="#E0AED0"
                      strokeWidth={2}
                      fill="url(#calmGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="neutral"
                      stroke="#FFE5E5"
                      strokeWidth={2}
                      fill="url(#neutralGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="sadness"
                      stroke="#AC87C5"
                      strokeWidth={2}
                      fill="url(#sadnessGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-mint" />
                  <span className="text-sm text-olive">Joy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#E0AED0" }} />
                  <span className="text-sm text-olive">Calm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFE5E5" }} />
                  <span className="text-sm text-olive">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#AC87C5" }} />
                  <span className="text-sm text-olive">Sadness</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Suggestions */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-burgundy">AI Suggestions</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className={`${suggestion.bg} border-2 border-border rounded-3xl p-8 h-full flex flex-col items-center text-center gap-6 hover:shadow-lg transition-shadow`}>
                    <div className={`${suggestion.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center`}>
                      <suggestion.icon className="w-10 h-10 text-burgundy" strokeWidth={1.5} />
                    </div>
                    <p className="text-burgundy font-medium text-lg leading-relaxed">
                      {suggestion.title}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative circles */}
          <div className="fixed top-20 left-10 w-24 h-24 rounded-full bg-mint/20 blur-2xl -z-10" />
          <div className="fixed bottom-20 right-10 w-32 h-32 rounded-full bg-pink-light/20 blur-2xl -z-10" />
          <div className="fixed top-1/2 right-20 w-20 h-20 rounded-full bg-primary/10 blur-xl -z-10" />
        </motion.div>
      </div>
    </div>
  );
};

export default MoodTracker;
