// resources/js/Components/Timeline/TimelineHero.jsx

import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scroll Indicator Only */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-2 text-amber-400"
          >
            <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
            <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-amber-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}