"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalCommand {
  command: string;
  output: React.ReactNode;
  id: string; // Unique ID for keys
}

// A simple typewriter effect component for string output
const TypewriterText = ({ text, delay = 0, speed = 0.02 }: { text: string, delay?: number, speed?: number }) => {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } }
  };

  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// A component to stagger the rendering of child elements (like lines of text)
const StaggerGroup = ({ children, delay = 0, staggerDelay = 0.1, className = "" }: { children: React.ReactNode, delay?: number, staggerDelay?: number, className?: string }) => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay }
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className={className}>
      {children}
    </motion.div>
  );
};

// Individual item within a StaggerGroup
const StaggerItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode = null;
    const id = Date.now().toString();

    switch (trimmedCmd) {
      case "help":
        output = (
          <StaggerGroup delay={0.1} staggerDelay={0.05} className="flex flex-col gap-1 mt-2 mb-4 text-outline-variant">
            <StaggerItem className="text-primary mb-2">Available commands:</StaggerItem>
            <div className="grid grid-cols-2 gap-2">
              <StaggerItem><span className="text-secondary">about</span> <span className="ml-2">Display information about me</span></StaggerItem>
              <StaggerItem><span className="text-secondary">skills</span> <span className="ml-2">List technical capabilities</span></StaggerItem>
              <StaggerItem><span className="text-secondary">projects</span> <span className="ml-2">View project directory</span></StaggerItem>
              <StaggerItem><span className="text-secondary">contact</span> <span className="ml-2">Show contact methods</span></StaggerItem>
              <StaggerItem><span className="text-secondary">clear</span> <span className="ml-2">Clear terminal output</span></StaggerItem>
              <StaggerItem><span className="text-secondary">help</span> <span className="ml-2">Show this help message</span></StaggerItem>
            </div>
          </StaggerGroup>
        );
        break;
      case "about":
        output = (
          <StaggerGroup delay={0.1} staggerDelay={0.1} className="mt-2 mb-4">
            <StaggerItem className="text-on-surface"><TypewriterText text="Hello! I'm John Doe, a Software Engineer passionate about building" speed={0.01}/></StaggerItem>
            <StaggerItem className="text-on-surface"><TypewriterText text="accessible, inclusive products and digital experiences." delay={0.5} speed={0.01}/></StaggerItem>
            <StaggerItem className="text-tertiary mt-2"><TypewriterText text="STATUS: Available for new opportunities." delay={1} speed={0.02}/></StaggerItem>
          </StaggerGroup>
        );
        break;
      case "skills":
        output = (
          <StaggerGroup delay={0.1} staggerDelay={0.2} className="mt-2 mb-4">
            <StaggerItem className="text-primary mb-2"><TypewriterText text="Loading Technical Skills Module..." speed={0.02} /></StaggerItem>
            <div className="flex gap-4 mt-2">
              <StaggerItem className="flex flex-col gap-1 border-l-2 border-secondary pl-2">
                <span className="text-secondary text-xs uppercase tracking-widest">Frontend</span>
                <span className="text-on-surface">React, Next.js, TypeScript</span>
              </StaggerItem>
              <StaggerItem className="flex flex-col gap-1 border-l-2 border-tertiary pl-2">
                <span className="text-tertiary text-xs uppercase tracking-widest">Backend</span>
                <span className="text-on-surface">Node.js, Python, PostgreSQL</span>
              </StaggerItem>
            </div>
          </StaggerGroup>
        );
        break;
      case "projects":
        output = (
          <StaggerGroup delay={0.1} staggerDelay={0.1} className="mt-2 mb-4">
            <StaggerItem className="text-primary mb-2"><TypewriterText text="Scanning Projects Directory..." speed={0.02}/></StaggerItem>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 text-on-surface-variant font-headline text-xs">
              <StaggerItem className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><span className="material-symbols-outlined text-[12px] text-secondary">folder</span> E-Commerce Platform</StaggerItem>
              <StaggerItem className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><span className="material-symbols-outlined text-[12px] text-tertiary">folder</span> Fitness Tracker App</StaggerItem>
              <StaggerItem className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><span className="material-symbols-outlined text-[12px] text-primary">folder</span> Weather API</StaggerItem>
            </div>
          </StaggerGroup>
        );
        break;
      case "contact":
        output = (
          <StaggerGroup delay={0.1} staggerDelay={0.2} className="mt-2 mb-4 flex flex-col gap-1">
            <StaggerItem className="text-on-surface">Email: <a href="mailto:hello@example.com" className="text-secondary hover:underline">hello@example.com</a></StaggerItem>
            <StaggerItem className="text-on-surface">GitHub: <a href="#" className="text-secondary hover:underline">github.com/johndoe</a></StaggerItem>
            <StaggerItem className="text-on-surface">LinkedIn: <a href="#" className="text-secondary hover:underline">linkedin.com/in/johndoe</a></StaggerItem>
          </StaggerGroup>
        );
        break;
      case "":
        output = null;
        break;
      default:
        output = (
          <StaggerItem className="text-error-dim mt-2 mb-4">
            <TypewriterText text={`Command not found: ${trimmedCmd}. Type 'help' to see available commands.`} speed={0.02}/>
          </StaggerItem>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output, id }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body p-4 md:p-8 flex flex-col relative z-0 selection:bg-primary/30 selection:text-primary">
      {/* Top Nav / Breadcrumb */}
      <header className="w-full flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">dataset</span>
            <span className="font-headline font-bold tracking-widest text-primary">NEON<span className="text-tertiary">_</span>OBSERVATORY</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-outline text-sm font-headline">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="hover:text-primary transition-colors cursor-pointer">SYS.CORE</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-secondary">TERMINAL_ENV</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-surface-variant/20 backdrop-blur-md border border-primary/20 hover:border-primary/60 px-4 py-2 rounded-md transition-all group">
            <span className="material-symbols-outlined text-sm text-primary group-hover:animate-spin">sync</span>
            <span className="font-headline text-xs text-primary">SYNC_DATA</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col xl:flex-row gap-6 h-[calc(100vh-140px)]">

        {/* Left Sidebar: File Tree */}
        <aside className="hidden xl:flex w-64 flex-col gap-6">
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
            <p className="text-[10px] font-headline text-outline mb-4 tracking-widest uppercase">Directory_Structure</p>
            <div className="space-y-1 font-headline text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded transition-colors group cursor-pointer" onClick={() => handleCommand("about")}>
                <span className="material-symbols-outlined text-sm text-primary">folder_open</span>
                <span className="group-hover:text-primary transition-colors">ROOT</span>
              </div>
              <div className="flex items-center gap-2 p-2 pl-6 hover:bg-white/5 rounded transition-colors group cursor-pointer" onClick={() => handleCommand("projects")}>
                <span className="material-symbols-outlined text-sm text-secondary">folder</span>
                <span className="group-hover:text-secondary transition-colors">projects/</span>
              </div>
              <div className="flex items-center gap-2 p-2 pl-10 hover:bg-white/5 rounded transition-colors group cursor-pointer bg-white/5 text-primary border-l-2 border-primary" onClick={() => handleCommand("skills")}>
                <span className="material-symbols-outlined text-sm text-tertiary">terminal</span>
                <span className="text-primary font-bold">skills.sh</span>
              </div>
              <div className="flex items-center gap-2 p-2 pl-10 hover:bg-white/5 rounded transition-colors group cursor-pointer" onClick={() => handleCommand("contact")}>
                <span className="material-symbols-outlined text-xs text-outline">description</span>
                <span className="group-hover:text-white transition-colors">contact.json</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer">
              <p className="text-[10px] font-headline text-secondary mb-1">STAGED_CHANGES</p>
              <p className="text-sm font-headline text-on-surface">+ terminal_ui.css</p>
            </div>
            <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/10 hover:border-tertiary/30 transition-all cursor-pointer">
              <p className="text-[10px] font-headline text-tertiary mb-1">REMOTE_SYNC</p>
              <p className="text-sm font-headline text-on-surface">32_COMMITS_AHEAD</p>
            </div>
          </div>
        </aside>

        {/* Central Terminal Window */}
        <section className="flex-grow flex flex-col bg-surface-container-lowest/80 backdrop-blur-2xl rounded-xl border border-white/5 overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 pointer-events-none scanline opacity-30 z-20"></div>

          {/* Terminal Header */}
          <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-white/10 relative z-30">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-error-dim"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-secondary-container"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-outline"></div>
            </div>
            <div className="text-[10px] font-headline text-outline tracking-[0.2em] flex items-center gap-2">
              <span className="material-symbols-outlined text-[12px]">terminal</span>
              BASH — SESSION: 0XF92 — NEON_OBSERVATORY
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-sm text-outline cursor-pointer hover:text-white" onClick={() => setHistory([])}>delete</span>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-grow p-6 font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar relative z-30" onClick={() => document.getElementById("terminal-input")?.focus()}>

            {/* Initial Boot Sequence Animation */}
            <StaggerGroup delay={0.2} staggerDelay={0.2} className="mb-6">
              <StaggerItem className="text-secondary mb-1">neonos_v2.0 login: <TypewriterText text="admin" delay={0.5} speed={0.1}/></StaggerItem>
              <StaggerItem className="text-secondary mb-1">password: <TypewriterText text="********" delay={1.5} speed={0.05}/></StaggerItem>
              <StaggerItem className="text-tertiary-dim mt-2 tracking-widest font-headline">ACCESS_GRANTED // SESSION_ID: 9912-X</StaggerItem>
              <StaggerItem className="text-outline-variant mt-1 mb-4">----------------------------------------------------</StaggerItem>
              <StaggerItem className="text-primary-dim"><TypewriterText text="Welcome to NEON_OBSERVATORY. Type 'help' to see available commands." delay={2} speed={0.02}/></StaggerItem>
            </StaggerGroup>

            {/* Render Command History */}
            <AnimatePresence initial={false}>
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-primary">user@neon:</span>
                    <span className="text-tertiary">~/portfolio</span>
                    <span className="text-on-surface">$</span>
                    <span className="text-on-surface ml-2">{item.command}</span>
                  </div>
                  <div>{item.output}</div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Active Input Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="flex items-center gap-2 mt-2"
            >
              <span className="text-primary">user@neon:</span>
              <span className="text-tertiary">~/portfolio</span>
              <span className="text-on-surface">$</span>
              <input
                id="terminal-input"
                className="bg-transparent border-none outline-none focus:ring-0 p-0 text-on-surface flex-grow font-mono caret-primary"
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
              />
            </motion.div>
            <div ref={terminalEndRef} className="h-4" />
          </div>
        </section>

        {/* Right Sidebar: HUD Stats */}
        <aside className="hidden lg:flex w-72 flex-col gap-6">
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-tertiary font-headline text-[10px] tracking-widest uppercase">System Status</span>
              <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-headline text-on-surface">CPU_USAGE</p>
                <p className="text-xs font-headline text-primary">64.2%</p>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[64%] animate-pulse"></div>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="h-4 flex-grow bg-primary/20"></div>
                <div className="h-4 flex-grow bg-primary/20"></div>
                <div className="h-4 flex-grow bg-primary/20"></div>
                <div className="h-4 flex-grow bg-primary/5"></div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-headline text-on-surface">MEM_ALLOC</p>
                <p className="text-xs font-headline text-tertiary">12.4 GB</p>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-tertiary to-primary w-[78%] animate-pulse"></div>
              </div>
              <p className="text-[10px] font-headline text-outline mt-2 tracking-tighter">LIMIT: 16.0 GB // SWAP: 2.1 GB</p>
            </div>

            <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#00affe] animate-pulse"></div>
                <div className="flex-grow">
                  <p className="text-[10px] font-headline text-on-surface uppercase">Uplink Stable</p>
                  <p className="text-[10px] font-headline text-outline">LATENCY: 12ms</p>
                </div>
                <span className="material-symbols-outlined text-secondary text-lg">sensors</span>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-surface-container/40 p-6 rounded-xl border-t border-white/5 backdrop-blur-sm">
            <p className="text-[10px] font-headline text-outline mb-4 tracking-widest uppercase">Hotkeys</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px] font-headline">
                <span className="text-on-surface-variant">NEW_TAB</span>
                <span className="px-2 py-0.5 bg-surface-container-high rounded border border-white/5 text-primary">CTRL+T</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-headline">
                <span className="text-on-surface-variant">EXECUTE</span>
                <span className="px-2 py-0.5 bg-surface-container-high rounded border border-white/5 text-primary">ENTER</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-headline">
                <span className="text-on-surface-variant">CLEAR</span>
                <span className="px-2 py-0.5 bg-surface-container-high rounded border border-white/5 text-primary">clear</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="w-full pt-6 flex flex-col md:flex-row justify-between items-center border-t border-white/5 mt-6 z-10">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <span className="text-tertiary font-bold font-headline text-[10px] tracking-[0.2em] uppercase">© 2024 NEON_OBSERVATORY // TERMINAL_ACCESS_GRANTED</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <a className="font-headline text-[10px] tracking-[0.2em] uppercase text-outline hover:text-tertiary transition-colors" href="#">DOCUMENTATION</a>
          <a className="font-headline text-[10px] tracking-[0.2em] uppercase text-outline hover:text-tertiary transition-colors" href="#">API_STATUS</a>
          <a className="font-headline text-[10px] tracking-[0.2em] uppercase text-outline hover:text-tertiary transition-colors" href="#">SECURITY_PROT</a>
        </div>
      </footer>

      {/* Atmosphere Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary-dim/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary-dim/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </div>
  );
}
