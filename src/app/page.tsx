import { Hero } from "@/components/sections/hero/Hero";
import { About } from "@/components/sections/about/About";
import { Skills } from "@/components/sections/skills/Skills";
import { Projects } from "@/components/sections/projects/Projects";
import { Experience } from "@/components/sections/experience/Experience";
import { Contact } from "@/components/sections/contact/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />

      {/* Footer */}
      <footer className="w-full py-8 border-t border-brand-blue/10 bg-brand-dark flex flex-col items-center justify-center gap-2">
        <p className="font-code text-sm text-foreground/60">
          Designed & Built by <span className="text-brand-purple">John Doe</span>
        </p>
        <p className="font-code text-xs text-foreground/40">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </main>
  );
}
