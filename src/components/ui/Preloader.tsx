"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const bootSequence = [
  "BIOS Date 05/14/2026 12:00:19 Ver 08.00.15",
  "CPU : Intel(R) Core(TM) i9-14900K @ 3.20GHz",
  "Speed : 3.20 GHz",
  " ",
  "Press DEL to run Setup",
  "Press F8 for BBS POPUP",
  "Initializing USB Controllers .. Done.",
  "65536MB OK",
  " ",
  "Auto-Detecting USB Mass Storage Devices ..",
  "00 USB mass storage devices found and configured.",
  " ",
  "Loading NEON_OBSERVATORY v2.0 kernel...",
  "Mounting core filesystems.....................[ OK ]",
  "Starting network services.....................[ OK ]",
  "Initializing ZSH environment..................[ OK ]",
];

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentLine = 0;

    // Simulate printing boot sequence lines rapidly
    const lineInterval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(lineInterval);
      }
    }, 100);

    // Simulate progress bar loading
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random bursts of loading speed
        return Math.min(prev + Math.random() * 20, 100);
      });
    }, 200);

    // Hide preloader after ~3 seconds
    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 3200);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-end p-8 bg-[#000000] font-mono text-[14px]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-4xl w-full flex flex-col gap-1 mb-8 text-on-surface/80">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
              >
                {line === " " ? "\u00A0" : line}
              </motion.div>
            ))}
          </div>

          <div className="w-full max-w-2xl mt-4">
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs font-headline text-on-surface">SYSTEM_INITIALIZATION</p>
              <p className="text-xs font-headline text-primary">{Math.floor(progress)}%</p>
            </div>
            <div className="h-1 w-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
