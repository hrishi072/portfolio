"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface TerminalCommand {
  command: string;
  output: React.ReactNode;
  id: string; // Unique ID for keys
  cwd: string;
}

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
          {letter === " " ? "00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

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
  const [cwd, setCwd] = useState("~/portfolio");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const zshPrompt = (dir: string) => (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span className="text-[#00C853] font-bold">➜</span>
      <span className="text-[#00E5FF] font-bold">{dir}</span>
      <span className="text-[#FFC400] font-bold text-xs flex items-center gap-1">git:(<span className="text-error-dim">main</span>)<span className="text-secondary">✗</span></span>
    </span>
  );

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const args = trimmedCmd.split(" ").filter(Boolean);
    const baseCmd = args[0]?.toLowerCase() || "";

    // Add to command history navigation array
    if (trimmedCmd) {
      setCommandHistory(prev => [trimmedCmd, ...prev]);
    }
    setHistoryIndex(-1);

    if (baseCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode = null;
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    let nextCwd = cwd;

    switch (baseCmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1 mt-2 mb-4 text-on-surface-variant font-mono">
            <p className="text-primary mb-2 font-bold">Available zsh commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1">
              <span className="text-secondary font-bold">ls</span><span>List directory contents</span>
              <span className="text-secondary font-bold">cd</span><span>Change directory</span>
              <span className="text-secondary font-bold">pwd</span><span>Print working directory</span>
              <span className="text-secondary font-bold">whoami</span><span>Print effective userid</span>
              <span className="text-secondary font-bold">cat</span><span>Concatenate and print files</span>
              <span className="text-secondary font-bold">clear</span><span>Clear terminal screen</span>
              <span className="text-secondary font-bold">help</span><span>Show this help message</span>
              <span className="text-secondary font-bold">sudo</span><span>Execute command as superuser</span>
            </div>
            <p className="mt-4 text-outline">Try navigating and reading files, e.g. <span className="text-tertiary">cat about.txt</span> or <span className="text-tertiary">./skills.sh</span></p>
          </div>
        );
        break;

      case "ls":
        if (cwd === "~/portfolio") {
          output = (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 mb-4 text-on-surface-variant">
              <span className="text-on-surface">about.txt</span>
              <span className="text-tertiary font-bold">skills.sh*</span>
              <span className="text-secondary font-bold">projects/</span>
              <span className="text-on-surface">contact.json</span>
            </div>
          );
        } else if (cwd === "~/portfolio/projects") {
           output = (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 mb-4 text-on-surface-variant">
              <span className="text-secondary font-bold">ecommerce/</span>
              <span className="text-secondary font-bold">fitness-app/</span>
              <span className="text-secondary font-bold">weather-api/</span>
            </div>
          );
        } else {
          output = <div className="mt-2 mb-4"></div>;
        }
        break;

      case "pwd":
        output = <div className="mt-2 mb-4 text-on-surface">{cwd.replace("~", "/Users/johndoe")}</div>;
        break;

      case "whoami":
        output = <div className="mt-2 mb-4 text-on-surface">johndoe</div>;
        break;

      case "echo":
        output = <div className="mt-2 mb-4 text-on-surface">{args.slice(1).join(" ")}</div>;
        break;

      case "cd":
        const target = args[1] || "~";
        if (target === "~" || target === "~/portfolio" || target === ".." || target === "../") {
           nextCwd = "~/portfolio";
        } else if (target === "projects" || target === "./projects" || target === "projects/") {
           if (cwd === "~/portfolio") {
             nextCwd = "~/portfolio/projects";
           } else {
             output = <div className="mt-2 mb-4 text-error-dim">cd: no such file or directory: {target}</div>;
           }
        } else {
           output = <div className="mt-2 mb-4 text-error-dim">cd: no such file or directory: {target}</div>;
        }
        break;

      case "cat":
        const file = args[1];
        if (!file) {
          output = <div className="mt-2 mb-4 text-error-dim">cat: missing operand</div>;
        } else if ((file === "about.txt" || file === "./about.txt") && cwd === "~/portfolio") {
          output = (
            <div className="mt-2 mb-4 text-on-surface leading-relaxed max-w-2xl border-l-2 border-outline-variant pl-4">
              <p>Hello! I&apos;m John Doe, a Software Engineer passionate about building</p>
              <p>accessible, inclusive products and digital experiences.</p>
              <p className="text-tertiary mt-4 font-bold">STATUS: Available for new opportunities.</p>
            </div>
          );
        } else if ((file === "contact.json" || file === "./contact.json") && cwd === "~/portfolio") {
          output = (
            <pre className="mt-2 mb-4 text-on-surface"><code>{`{
  "name": "John Doe",
  "email": "hello@example.com",
  "socials": {
    "github": "github.com/johndoe",
    "linkedin": "linkedin.com/in/johndoe"
  }
}`}</code></pre>
          );
        } else {
          output = <div className="mt-2 mb-4 text-error-dim">cat: {file}: No such file or directory</div>;
        }
        break;

      case "./skills.sh":
      case "sh skills.sh":
      case "bash skills.sh":
        if (cwd === "~/portfolio") {
          output = (
            <div className="mt-2 mb-4">
              <p className="text-primary mb-3 font-bold">Executing skills.sh ...</p>
              <div className="flex gap-6">
                <div className="flex flex-col gap-1 border-l-2 border-secondary pl-3">
                  <span className="text-secondary text-xs uppercase tracking-widest mb-1">Frontend</span>
                  <span className="text-on-surface">React, Next.js</span>
                  <span className="text-on-surface">TypeScript, Tailwind</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-tertiary pl-3">
                  <span className="text-tertiary text-xs uppercase tracking-widest mb-1">Backend</span>
                  <span className="text-on-surface">Node.js, Python</span>
                  <span className="text-on-surface">PostgreSQL, Redis</span>
                </div>
              </div>
            </div>
          );
        } else {
          output = <div className="mt-2 mb-4 text-error-dim">zsh: command not found: {trimmedCmd}</div>;
        }
        break;

      case "sudo":
        output = <div className="mt-2 mb-4 text-on-surface">johndoe is not in the sudoers file. This incident will be reported.</div>;
        break;

      case "":
        output = null;
        break;

      default:
        output = (
          <div className="text-error-dim mt-2 mb-4">zsh: command not found: {baseCmd}</div>
        );
    }

    setHistory((prev) => [...prev, { command: trimmedCmd, output, id, cwd }]);
    if (nextCwd !== cwd) {
      setCwd(nextCwd);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      handleCommand("clear");
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
            <span className="text-secondary">ZSH_ENV</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col xl:flex-row gap-6 h-[calc(100vh-140px)]">

        {/* Left Sidebar: File Tree */}
        <aside className="hidden xl:flex w-64 flex-col gap-6">
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
            <p className="text-[10px] font-headline text-outline mb-4 tracking-widest uppercase">Directory_Structure</p>
            <div className="space-y-1 font-headline text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded transition-colors group cursor-pointer" onClick={() => handleCommand("cat about.txt")}>
                <span className="material-symbols-outlined text-sm text-primary">folder_open</span>
                <span className="group-hover:text-primary transition-colors">ROOT</span>
              </div>
              <div className="flex items-center gap-2 p-2 pl-6 hover:bg-white/5 rounded transition-colors group cursor-pointer" onClick={() => handleCommand("ls projects/")}>
                <span className="material-symbols-outlined text-sm text-secondary">folder</span>
                <span className="group-hover:text-secondary transition-colors">projects/</span>
              </div>
              <div className="flex items-center gap-2 p-2 pl-10 hover:bg-white/5 rounded transition-colors group cursor-pointer bg-white/5 text-primary border-l-2 border-primary" onClick={() => handleCommand("./skills.sh")}>
                <span className="material-symbols-outlined text-sm text-tertiary">terminal</span>
                <span className="text-primary font-bold">skills.sh</span>
              </div>
              <div className="flex items-center gap-2 p-2 pl-10 hover:bg-white/5 rounded transition-colors group cursor-pointer" onClick={() => handleCommand("cat contact.json")}>
                <span className="material-symbols-outlined text-xs text-outline">description</span>
                <span className="group-hover:text-white transition-colors">contact.json</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Central Terminal Window */}
        <section className="flex-grow flex flex-col bg-surface-container-lowest/90 backdrop-blur-2xl rounded-xl border border-white/5 overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 pointer-events-none scanline opacity-20 z-20"></div>

          {/* Terminal Header */}
          <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-white/10 relative z-30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
            </div>
            <div className="text-[10px] font-headline text-outline tracking-[0.2em] flex items-center gap-2">
              <span className="material-symbols-outlined text-[12px]">terminal</span>
              johndoe@macbook-pro:~ — zsh — 80x24
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-sm text-outline cursor-pointer hover:text-white" onClick={() => setHistory([])}>delete</span>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-grow p-6 font-mono text-[15px] leading-relaxed overflow-y-auto custom-scrollbar relative z-30" onClick={() => document.getElementById("terminal-input")?.focus()}>

            {/* Initial Boot Sequence Animation */}
            <StaggerGroup delay={0.2} staggerDelay={0.1} className="mb-6">
              <StaggerItem className="text-secondary mb-1 font-bold">Last login: {new Date().toUTCString().split(' ')[0]} {new Date().toUTCString().split(' ')[4]} on ttys001</StaggerItem>
              <StaggerItem className="text-primary-dim mt-2"><TypewriterText text="Welcome to Oh My Zsh." delay={0.5} speed={0.02}/></StaggerItem>
              <StaggerItem className="text-outline-variant mt-1 mb-4">Type &apos;help&apos; to see available commands.</StaggerItem>
            </StaggerGroup>

            {/* Render Command History */}
            {history.map((item) => (
              <div key={item.id} className="mb-1">
                <div className="flex items-center gap-2">
                  {zshPrompt(item.cwd)}
                  <span className="text-on-surface ml-1">{item.command}</span>
                </div>
                {item.output}
              </div>
            ))}

            {/* Active Input Area */}
            <div className="flex items-center gap-2 mt-1">
              {zshPrompt(cwd)}
              <input
                id="terminal-input"
                className="bg-transparent border-none outline-none focus:ring-0 p-0 text-on-surface flex-grow font-mono caret-white ml-1"
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
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
          </div>

          <div className="mt-auto bg-surface-container/40 p-6 rounded-xl border-t border-white/5 backdrop-blur-sm">
            <p className="text-[10px] font-headline text-outline mb-4 tracking-widest uppercase">Terminal Hotkeys</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px] font-headline">
                <span className="text-on-surface-variant">PREVIOUS CMD</span>
                <span className="px-2 py-0.5 bg-surface-container-high rounded border border-white/5 text-primary">↑ UP</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-headline">
                <span className="text-on-surface-variant">EXECUTE</span>
                <span className="px-2 py-0.5 bg-surface-container-high rounded border border-white/5 text-primary">ENTER</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-headline">
                <span className="text-on-surface-variant">CLEAR SCREEN</span>
                <span className="px-2 py-0.5 bg-surface-container-high rounded border border-white/5 text-primary">CTRL+L</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="w-full pt-6 flex flex-col md:flex-row justify-between items-center border-t border-white/5 mt-6 z-10">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <span className="text-tertiary font-bold font-headline text-[10px] tracking-[0.2em] uppercase">© 2024 NEON_OBSERVATORY // ZSH_ACCESS_GRANTED</span>
        </div>
      </footer>

      {/* Atmosphere Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary-dim/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary-dim/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </div>
  );
}
