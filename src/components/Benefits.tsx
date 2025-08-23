import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Lightbulb, Shield } from "lucide-react";
const Benefits: React.FC = () => {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  const benefits = [{
    icon: <TrendingUp className="w-8 h-8 text-gray-700" />,
    title: "More efficiency",
    description: "Streamline operations and eliminate bottlenecks to maximize productivity"
  }, {
    icon: <Lightbulb className="w-8 h-8 text-gray-700" />,
    title: "More innovation",
    description: "Foster creative solutions and breakthrough thinking in your organization"
  }, {
    icon: <Shield className="w-8 h-8 text-gray-700" />,
    title: "More trust",
    description: "Build confidence through transparent processes and measurable results"
  }];
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 rounded-lg bg-card border border-border"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Benefits;