"use client";

import React from "react";
import { motion } from "framer-motion";

const greetingSections = [
  {
    id: 1,
    title: "📈 View Portfolio",
  },
  {
    id: 2,
    title: "🎯 Check Health Scores",
  },
  {
    id: 3,
    title: "⭐ Add to Watchlist",
  },
  {
    id: 4,
    title: "🔔 Set Alert",
  },
];

const GreetingSections = () => {
  return (
    <div className="w-full flex flex-wrap gap-10 mt-8 justify-center">
      {greetingSections.map((section) => (
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.1 , ease: "linear"}}
          key={section.id}
          className="border px-4 py-2 rounded-3xl text-sm hover:bg-primary/30 cursor-pointer transition-all duration-200 ease-in"
        >
          {section.title}
        </motion.div>
      ))}
    </div>
  );
};

export default GreetingSections;
