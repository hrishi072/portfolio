"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FiGithub, FiExternalLink, FiX } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "All" | "Web" | "Mobile" | "API" | "Open Source";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: Category;
  tech: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with Next.js and Stripe.",
    longDescription: "A comprehensive e-commerce platform built to handle high traffic and complex product variants. Features include secure checkout with Stripe, real-time inventory management, a custom CMS for admins, and a highly optimized responsive frontend.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Fitness Tracker App",
    description: "React Native mobile app for tracking workouts and nutrition.",
    longDescription: "A cross-platform mobile application that helps users track their fitness goals. Includes features like custom workout plans, meal logging with barcode scanning, progress charts, and social sharing capabilities.",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop",
    category: "Mobile",
    tech: ["React Native", "Expo", "Firebase", "Redux", "Node.js"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Weather Dashboard API",
    description: "High-performance REST API serving global weather data.",
    longDescription: "A scalable REST API built with Node.js and Express that aggregates weather data from multiple sources. Implements Redis caching for sub-50ms response times, JWT authentication, and comprehensive rate limiting.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop",
    category: "API",
    tech: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "DevTools UI Library",
    description: "Open-source React component library for developers.",
    longDescription: "A customizable, accessible, and performant UI component library built for React applications. Features over 50 components, comprehensive documentation using Storybook, and full TypeScript support. Currently has over 1k stars on GitHub.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    category: "Open Source",
    tech: ["React", "TypeScript", "Storybook", "Framer Motion", "Rollup"],
    github: "#",
    demo: "#",
  },
];

const categories: Category[] = ["All", "Web", "Mobile", "API", "Open Source"];

// 3D Tilt Card Component
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardRef.current, {
      rotationY: (x / rect.width) * 20,
      rotationX: -(y / rect.height) * 20,
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full glass rounded-xl overflow-hidden group border border-white/5 hover:border-brand-blue/30 transition-colors flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-48 w-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-6 relative flex-grow flex flex-col" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-brand-blue transition-colors">{project.title}</h3>
          <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="text-xs font-code text-brand-purple bg-brand-purple/10 px-2 py-1 rounded">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs font-code text-foreground/50 px-2 py-1">+{project.tech.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  useEffect(() => {
    // Disable body scroll when modal is open
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative w-full overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gradient">
            <span className="text-brand-green opacity-50 text-2xl mr-2">03.</span>
            Featured Projects
          </h2>
          <div className="h-[1px] bg-brand-green/30 flex-grow max-w-xs"></div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-code text-sm transition-all ${
                activeCategory === cat
                  ? "bg-brand-blue text-brand-dark font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)] scale-105"
                  : "glass text-foreground hover:border-brand-blue/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            >
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                onClick={() => setSelectedProject(null)}
              ></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-brand-blue/30 shadow-[0_0_30px_rgba(0,212,255,0.1)] z-10 flex flex-col md:flex-row custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-brand-purple/50 text-white rounded-full backdrop-blur-md transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <FiX size={20} />
                </button>

                {/* Modal Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 md:from-transparent md:bg-gradient-to-r md:to-background/90 to-transparent"></div>
                </div>

                {/* Modal Content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="text-brand-blue font-code text-sm mb-2">{selectedProject.category}</div>
                  <h3 className="text-3xl font-bold font-heading mb-4 text-gradient">{selectedProject.title}</h3>
                  <p className="text-foreground/80 font-body mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold font-heading text-white/50 mb-3 uppercase tracking-wider">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                        <span key={i} className="text-xs font-code border border-white/10 bg-white/5 px-3 py-1.5 rounded-md text-foreground/90">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-blue text-brand-dark font-bold font-heading hover:bg-brand-blue/80 transition-colors"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-brand-purple text-foreground font-bold font-heading hover:bg-brand-purple/10 transition-colors"
                    >
                      <FiGithub /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
