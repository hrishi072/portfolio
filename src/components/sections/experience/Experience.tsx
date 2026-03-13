"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiBriefcase, FiAward, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "Tech Innovators Inc.",
    date: "2023 - Present",
    description: [
      "Led the migration of a legacy monolithic application to a microservices architecture, improving system scalability by 40%.",
      "Mentored a team of 5 junior developers, conducting code reviews and pair programming sessions.",
      "Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 60%.",
    ],
    tech: ["React", "Node.js", "Docker", "AWS", "GraphQL"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Digital Solutions Agency",
    date: "2020 - 2023",
    description: [
      "Developed and maintained over 20 client websites and web applications using React, Next.js, and Tailwind CSS.",
      "Integrated various third-party APIs including Stripe, SendGrid, and Google Maps.",
      "Optimized database queries, resulting in a 30% reduction in page load times across major projects.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Startup X",
    date: "2018 - 2020",
    description: [
      "Built the initial frontend architecture for a real-time collaboration tool using React and WebSockets.",
      "Collaborated closely with UX/UI designers to implement pixel-perfect, responsive interfaces.",
      "Established comprehensive unit and integration testing protocols using Jest and Cypress.",
    ],
    tech: ["React", "Redux", "Socket.io", "Jest", "Sass"],
  },
];

const education = [
  {
    id: 1,
    degree: "B.S. Computer Science",
    school: "University of Technology",
    date: "2014 - 2018",
    details: "Graduated with Honors. Specialization in Software Engineering and Artificial Intelligence.",
    link: "#",
  },
  {
    id: 2,
    degree: "AWS Certified Solutions Architect",
    school: "Amazon Web Services",
    date: "2022",
    details: "Associate Level Certification demonstrating comprehensive understanding of AWS cloud platform.",
    link: "#",
  },
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate experience timeline items
      const items = gsap.utils.toArray<HTMLElement>(".exp-item");

      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Animate the central line
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
      });

      // Animate education flip cards
      gsap.from(".edu-card", {
        scrollTrigger: {
          trigger: ".edu-container",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        rotationY: -90,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative w-full bg-brand-dark/30">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* EXPERIENCE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex items-center gap-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gradient">
            <span className="text-brand-purple opacity-50 text-2xl mr-2">04.</span>
            Experience
          </h2>
          <div className="h-[1px] bg-brand-purple/30 flex-grow max-w-xs"></div>
        </motion.div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto mb-32">
          {/* Center Line */}
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-blue via-brand-purple to-brand-green -translate-x-1/2 hidden md:block z-0"></div>

          {/* Mobile Line */}
          <div className="timeline-line absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-blue via-brand-purple to-brand-green md:hidden z-0"></div>

          <div className="space-y-12 relative z-10">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className={`exp-item flex flex-col md:flex-row relative ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-brand-dark border-4 border-brand-blue flex items-center justify-center -translate-x-1/2 shadow-[0_0_15px_rgba(0,212,255,0.5)] z-20">
                  <FiBriefcase className="text-brand-blue" />
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 pt-2 md:pt-0 ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass p-8 rounded-2xl neon-border border border-brand-blue/20 hover:border-brand-blue/50 transition-colors">
                    <div className="flex flex-col mb-4">
                      <span className="text-brand-blue font-code text-sm mb-1">{exp.date}</span>
                      <h3 className="text-2xl font-bold font-heading">{exp.role}</h3>
                      <h4 className="text-lg text-foreground/70 font-medium">{exp.company}</h4>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-foreground/80 text-sm font-body flex items-start gap-2">
                          <span className="text-brand-purple mt-1">▹</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, i) => (
                        <span key={i} className="text-xs font-code text-brand-green bg-brand-green/10 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION & CERTIFICATIONS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center justify-end gap-4"
        >
          <div className="h-[1px] bg-brand-green/30 flex-grow max-w-xs hidden md:block"></div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gradient text-right">
            <span className="text-brand-green opacity-50 text-2xl mr-2">05.</span>
            Education & Certs
          </h2>
        </motion.div>

        <div className="edu-container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto perspective-1000">
          {education.map((edu) => (
            <div key={edu.id} className="edu-card group h-64 perspective-1000 cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">

                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden glass rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-brand-purple/20 flex items-center justify-center mb-4 text-3xl text-brand-purple shadow-[0_0_15px_rgba(180,74,255,0.3)]">
                    <FiAward />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-2">{edu.degree}</h3>
                  <p className="text-foreground/60 font-code text-sm">{edu.school}</p>
                  <p className="text-brand-blue font-code text-xs mt-2">{edu.date}</p>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass rounded-2xl border border-brand-purple/50 p-8 flex flex-col items-center justify-center text-center bg-brand-purple/5">
                  <h3 className="text-lg font-bold font-heading mb-4 text-brand-purple">{edu.degree}</h3>
                  <p className="text-foreground/80 text-sm mb-6">{edu.details}</p>
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30 transition-colors font-code text-sm"
                  >
                    Verify <FiExternalLink />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Required CSS for 3D flip cards */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </section>
  );
};
