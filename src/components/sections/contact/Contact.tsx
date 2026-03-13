"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiSend, FiDownload } from "react-icons/fi";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

const socialLinks = [
  { name: "GitHub", icon: FiGithub, url: "#" },
  { name: "LinkedIn", icon: FiLinkedin, url: "#" },
  { name: "Twitter", icon: FiTwitter, url: "#" },
  { name: "Email", icon: FiMail, url: "mailto:hello@example.com" },
];

// 3D Envelope Component (Simplified representation)
const EnvelopeModel = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group rotation={[0.2, Math.PI / 4, 0]}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshStandardMaterial color="#00d4ff" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Flap */}
        <mesh position={[0, 1.25, 0.06]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[2.05, 2.05, 0.1, 3]} />
          <meshStandardMaterial color="#b44aff" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Paper sticking out */}
        <mesh position={[0, 0.5, 0.02]}>
          <planeGeometry args={[3.6, 2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative w-full overflow-hidden">

      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gradient">
            <span className="text-brand-blue opacity-50 text-2xl mr-2">06.</span>
            Get In Touch
          </h2>
          <div className="h-[1px] bg-brand-blue/30 flex-grow max-w-xs"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Info & 3D Element */}
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-3xl font-bold font-heading mb-6">Let&apos;s work together</h3>
              <p className="text-foreground/80 font-body mb-8 max-w-md">
                Although I&apos;m not currently looking for any new opportunities, my inbox is always open.
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>

              <div className="flex gap-4 mb-8">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl text-foreground hover:text-brand-blue hover:border-brand-blue/50 transition-colors shadow-sm hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                  >
                    <link.icon />
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-green text-brand-green font-code hover:bg-brand-green/10 transition-colors"
              >
                <FiDownload /> Download Resume
              </motion.a>
            </motion.div>

            {/* 3D Envelope */}
            <div className="w-full h-[300px] mt-auto hidden lg:block">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#00d4ff" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b44aff" />
                <EnvelopeModel />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 md:p-10 rounded-2xl neon-border"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-code text-foreground/70">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors font-body text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-code text-foreground/70">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors font-body text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-code text-foreground/70">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors font-body text-foreground"
                  placeholder="Hello!"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-code text-foreground/70">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors font-body text-foreground resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 py-4 rounded-lg font-bold font-heading transition-all ${
                  submitStatus === "success"
                    ? "bg-brand-green text-brand-dark"
                    : "bg-brand-blue text-brand-dark hover:bg-brand-blue/90 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                }`}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></span>
                ) : submitStatus === "success" ? (
                  "Message Sent!"
                ) : (
                  <>Send Message <FiSend /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
