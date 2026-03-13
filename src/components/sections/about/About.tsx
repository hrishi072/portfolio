"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCode, FiCoffee, FiGithub, FiStar } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Years Experience", value: "5+", icon: <FiStar /> },
  { label: "Projects Completed", value: "50+", icon: <FiCode /> },
  { label: "GitHub Commits", value: "2,500+", icon: <FiGithub /> },
  { label: "Cups of Coffee", value: "9,000+", icon: <FiCoffee /> },
];

const timeline = [
  { year: "2023 - Present", role: "Senior Software Engineer", company: "Tech Innovators Inc." },
  { year: "2020 - 2023", role: "Full Stack Developer", company: "Digital Solutions Agency" },
  { year: "2018 - 2020", role: "Frontend Developer", company: "Startup X" },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate 3D Card on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(cardRef.current, {
          rotationY: (x / rect.width) * 30,
          rotationX: -(y / rect.height) * 30,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center center",
        });
      };

      const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
          rotationY: 0,
          rotationX: 0,
          ease: "power2.out",
        });
      };

      if (cardRef.current) {
        cardRef.current.addEventListener("mousemove", handleMouseMove);
        cardRef.current.addEventListener("mouseleave", handleMouseLeave);
      }

      // Stats stagger animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Timeline 3D nodes animation
      gsap.from(".timeline-node", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
        },
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: "back.out(1.5)",
      });

      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener("mousemove", handleMouseMove);
          cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative w-full overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gradient">
            <span className="text-brand-purple opacity-50 text-2xl mr-2">01.</span>
            About Me
          </h2>
          <div className="h-[1px] bg-brand-blue/30 flex-grow max-w-xs"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: 3D Profile Card & Intro */}
          <div className="flex flex-col gap-8">
            <div
              ref={cardRef}
              className="w-full max-w-md mx-auto aspect-square rounded-2xl glass neon-border relative group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 rounded-2xl"
                style={{ transform: "translateZ(30px)" }}
              ></div>
              <div
                className="absolute inset-4 rounded-xl border border-white/10 flex flex-col items-center justify-center p-6 text-center"
                style={{ transform: "translateZ(60px)" }}
              >
                <div className="w-32 h-32 rounded-full border-4 border-brand-blue mb-4 overflow-hidden relative bg-brand-dark/50 flex items-center justify-center">
                  <FiCode className="text-5xl text-brand-blue" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">John Doe</h3>
                <p className="text-brand-purple font-code text-sm">Software Engineer & Creative Developer</p>
              </div>
            </div>

            <div className="space-y-4 text-foreground/80 font-body">
              <p>
                Hello! My name is John and I enjoy creating things that live on the internet.
                My interest in web development started back in 2012 when I decided to try
                editing custom Tumblr themes — turns out hacking together HTML & CSS taught me
                a lot about HTML & CSS!
              </p>
              <p>
                Fast-forward to today, and I&apos;ve had the privilege of working at an advertising agency,
                a start-up, a huge corporation, and a student-led design studio. My main focus these
                days is building accessible, inclusive products and digital experiences for a variety of clients.
              </p>
            </div>
          </div>

          {/* Right Column: Stats & Timeline */}
          <div className="flex flex-col gap-12">

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item glass p-6 rounded-xl border border-brand-green/20 hover:border-brand-green/50 transition-colors group">
                  <div className="text-3xl text-brand-green mb-3 group-hover:scale-110 transition-transform origin-left">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold font-heading mb-1">{stat.value}</div>
                  <div className="text-sm text-foreground/60 font-code">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Career Timeline */}
            <div className="timeline-container relative pl-8 border-l-2 border-brand-purple/20 space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* 3D Node */}
                  <div className="timeline-node absolute -left-[41px] top-1 w-6 h-6 rounded-md bg-brand-dark border-2 border-brand-purple flex items-center justify-center rotate-45 group-hover:bg-brand-purple transition-colors shadow-[0_0_10px_rgba(180,74,255,0.5)]">
                    <div className="w-2 h-2 rounded-full bg-brand-blue -rotate-45" />
                  </div>

                  <div className="glass p-5 rounded-lg border border-brand-blue/10 ml-4 hover:-translate-y-1 transition-transform">
                    <span className="text-brand-blue font-code text-xs mb-2 block">{item.year}</span>
                    <h4 className="text-lg font-bold font-heading">{item.role}</h4>
                    <p className="text-foreground/60 text-sm mt-1">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
