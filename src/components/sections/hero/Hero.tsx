"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Preload } from "@react-three/drei";
import { Suspense } from "react";

// Placeholder for a 3D Laptop model
const LaptopModel = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh rotation={[0.5, Math.PI / 4, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        {/* Screen */}
        <mesh position={[0, 1.1, -0.9]} rotation={[Math.PI / 2 + 0.2, 0, 0]}>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#000" />
          {/* Screen Light/Content */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
          </mesh>
        </mesh>
      </mesh>
    </Float>
  );
};

// Simple particle background
const Particles = () => {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const count = 500;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        pos[i] = (Math.random() - 0.5) * 20;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setPositions(pos);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (!positions) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

export const Hero = () => {
  const text = "Hi, I'm John Doe — Software Engineer".split("");

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50 dark:opacity-100">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00d4ff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b44aff" />
          <Suspense fallback={null}>
            <Particles />
            <group position={[3, 0, 0]} scale={0.8}>
              <LaptopModel />
            </group>
            <Preload all />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mt-20 md:mt-0 text-center md:text-left">

          <motion.div
            className="inline-block px-4 py-1.5 rounded-full border border-brand-purple/50 bg-brand-purple/10 text-brand-purple font-code text-sm mb-6 shadow-[0_0_15px_rgba(180,74,255,0.3)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Available for new opportunities
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-4 min-h-[160px] md:min-h-[200px]">
            {text.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: 2.5 + index * 0.05,
                }}
                className={index > 14 ? "text-gradient" : "text-foreground"}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-lg md:text-xl text-foreground/70 mb-8 max-w-lg font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
          >
            I build exceptional and accessible digital experiences for the web. Crafting beautiful, performant 3D interfaces with modern web technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a href="#projects" className="relative px-8 py-4 rounded-lg bg-brand-blue text-brand-dark font-bold font-heading hover:scale-105 transition-transform group overflow-hidden shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </a>

            <a href="#contact" className="px-8 py-4 rounded-lg border border-brand-purple text-foreground font-bold font-heading hover:bg-brand-purple/10 transition-colors shadow-[0_0_10px_rgba(180,74,255,0.1)] hover:shadow-[0_0_20px_rgba(180,74,255,0.3)]">
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 5, duration: 1 }}
      >
        <span className="text-xs font-code uppercase tracking-widest mb-2 text-brand-blue">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-brand-blue to-transparent"
          animate={{ scaleY: [0, 1, 0], translateY: [0, 10, 20] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
};
