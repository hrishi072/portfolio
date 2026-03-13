"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Float } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import {
  FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaHtml5,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiGraphql } from "react-icons/si";

const skills = [
  { name: "React", icon: FaReact, color: "#61DAFB", level: "Expert" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: "Expert" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: "Advanced" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933", level: "Advanced" },
  { name: "Python", icon: FaPython, color: "#3776AB", level: "Intermediate" },
  { name: "AWS", icon: FaAws, color: "#FF9900", level: "Intermediate" },
  { name: "Docker", icon: FaDocker, color: "#2496ED", level: "Intermediate" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: "Advanced" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: "Advanced" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: "Expert" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", level: "Intermediate" },
  { name: "HTML/CSS", icon: FaHtml5, color: "#E34F26", level: "Expert" },
];

const categories = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { title: "Backend", items: ["Node.js", "Python", "GraphQL"] },
  { title: "Database & Cloud", items: ["MongoDB", "PostgreSQL", "AWS", "Docker"] },
];

// Rotating globe with icons
const TechGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial color="#0a0a0a" wireframe wireframeLinewidth={2} emissive="#00d4ff" emissiveIntensity={0.2} transparent opacity={0.3} />
      </Sphere>

      {skills.map((skill, i) => {
        // Calculate spherical coordinates for even distribution
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;

        const radius = 2.5;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        return (
          <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2} position={[x, y, z]}>
            <Html center zIndexRange={[100, 0]}>
              <div
                className="group relative cursor-pointer"
                style={{ color: skill.color }}
              >
                <div className="p-3 glass rounded-full hover:scale-125 transition-transform bg-black/50 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <skill.icon size={24} />
                </div>

                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 backdrop-blur-md border border-brand-blue px-3 py-1.5 rounded-md pointer-events-none text-white text-xs z-[100] shadow-[0_0_10px_rgba(0,212,255,0.3)] font-code">
                  <span className="font-bold text-brand-blue">{skill.name}</span>
                  <span className="mx-2 text-white/50">|</span>
                  <span className="text-brand-purple">{skill.level}</span>
                </div>
              </div>
            </Html>
          </Float>
        );
      })}
    </group>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-32 relative w-full bg-brand-dark/50 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center justify-end gap-4"
        >
          <div className="h-[1px] bg-brand-purple/30 flex-grow max-w-xs hidden md:block"></div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gradient text-right">
            <span className="text-brand-blue opacity-50 text-2xl mr-2">02.</span>
            Technical Skills
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left Column: Skill Categories */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="glass p-8 rounded-2xl neon-border group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-blue/20 transition-colors duration-500"></div>

                <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.items.map((item, i) => {
                    const skillData = skills.find(s => s.name === item);
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="px-4 py-2 rounded-lg bg-background/50 border border-white/5 flex items-center gap-2 text-sm font-code text-foreground/80 hover:text-white hover:border-brand-blue/50 transition-all cursor-default shadow-sm hover:shadow-[0_0_10px_rgba(0,212,255,0.2)]"
                      >
                        {skillData && <skillData.icon className="text-lg" style={{ color: skillData.color }} />}
                        {item}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: 3D Globe Canvas */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative">
            <div className="absolute inset-0 bg-gradient-radial from-brand-blue/10 to-transparent opacity-50 z-0 rounded-full blur-3xl"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full h-full relative z-10"
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#00d4ff" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b44aff" />

                <Suspense fallback={null}>
                  <TechGlobe />
                </Suspense>

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.8}
                />
              </Canvas>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
