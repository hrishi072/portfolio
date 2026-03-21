"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text?: string;
  children?: React.ReactNode;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const Typewriter = ({
  text,
  children,
  speed = 0.02,
  delay = 0,
  className = "",
  onComplete
}: TypewriterProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const runAnimation = async () => {
        await controls.start("visible");
        setIsDone(true);
        if (onComplete) onComplete();
      };
      runAnimation();
    }
  }, [isInView, controls, onComplete]);

  // If simple text is passed, split by characters
  if (text) {
    const letters = Array.from(text);

    const containerVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: speed,
          delayChildren: delay,
        }
      }
    };

    const letterVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0
        }
      }
    };

    return (
      <motion.span
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={className}
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // If complex children (JSX) are passed, we fade them in sequentially line-by-line
  // This is a simpler approximation for complex HTML content
  const childrenVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: delay
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={childrenVariants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TypewriterGroup = ({
  children,
  className = "",
  staggerDelay = 0.2
}: {
  children: React.ReactNode,
  className?: string,
  staggerDelay?: number
}) => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const AnimatedBlock = ({ children }: { children: React.ReactNode }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
};
