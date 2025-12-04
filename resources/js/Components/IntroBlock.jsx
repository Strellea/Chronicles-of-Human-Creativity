import React from 'react';
import { motion } from 'framer-motion';

export default function IntroBlock() {
  return (
    <section id="story-start" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="font-display text-3xl text-cinematic-offwhite">
          Chronicles of Human Creativity
        </motion.h2>
        <motion.p className="mt-4 text-gray-300 max-w-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Scroll to explore curated artifacts and stories from prehistory to contemporary works. This experience pulls real objects from The Metropolitan Museum of Art’s public collection API.
        </motion.p>
      </div>
    </section>
  );
}
