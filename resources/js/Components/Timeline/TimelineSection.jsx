// resources/js/Components/Timeline/TimelineSection.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';
import ArtworkCard from './ArtworkCard';

// 3D Floating Orb for each section
function FloatingOrb({ color }) {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.2, 0.2]}
    >
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// 3D Period Text
function Period3DText({ text, position }) {
  return (
    <Center position={position}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  );
}

export default function TimelineSection({ period, artworks, onArtworkClick }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // Get color for 3D orb based on period
  const getOrbColor = () => {
    const colorMap = {
      'renaissance': '#f59e0b',
      'baroque': '#8b5cf6',
      'romanticism': '#06b6d4',
      'modern': '#ef4444',
      'contemporary': '#10b981'
    };
    return colorMap[period.id] || '#fbbf24';
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className={`relative min-h-screen py-20 px-4 bg-gradient-to-b ${period.color}`}
    >
      {/* 3D Canvas Background - Decorative Orb */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingOrb color={getOrbColor()} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Period Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20"
          >
            <span className="text-amber-300 font-semibold tracking-wider">
              {period.period}
            </span>
          </motion.div>

          {/* Title with Stagger Effect */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {period.title.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Description with Typewriter Effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          >
            {period.description}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-8 max-w-md mx-auto"
          />
        </motion.div>

        {/* Artworks Grid with Stagger */}
        {artworks.length > 0 ? (
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {artworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                isInView={isInView}
                onClick={() => onArtworkClick(artwork, artworks, index)}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full mb-4"
            />
            <p className="text-white/60 text-lg">Loading artworks...</p>
          </div>
        )}

        {/* Section Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100 
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
          />
        ))}
      </div>
    </motion.section>
  );
}