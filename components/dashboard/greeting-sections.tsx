"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const greetingSections = [
  {
    id: 1,
    title: "📈 View Portfolio",
    url: "/portfolio",
  },
  {
    id: 2,
    title: "🎯 Check Health Scores",
    url: "/health-score",
  },
  {
    id: 3,
    title: "⭐ Add to Watchlist",
    url: "/dashboard",
  },
  {
    id: 4,
    title: "🔔 Set Alert",
    url: "/dashboard",
  },
];

const GreetingSections = () => {
  return (
    <div className="w-full flex flex-wrap gap-10 mt-8 justify-center">
      {greetingSections.map((section) => (
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.1, ease: "linear" }}
          key={section.id}
          className="border px-4 py-2 rounded-3xl text-sm hover:bg-primary/30 cursor-pointer transition-all duration-200 ease-in"
        >
          <Link href={section.url}>{section.title}</Link>
        </motion.div>
      ))}
    </div>
  );
};

export default GreetingSections;
