import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterEffect({ 
  text, 
  className = "", 
  delay = 0,
  speed = 0.05 
}: TypewriterEffectProps) {
  const controls = useAnimation();
  const letters = Array.from(text);

  useEffect(() => {
    const sequence = letters.map((_, i) => ({
      opacity: 1,
      transition: { duration: speed, delay: delay + i * speed }
    }));

    controls.start((i) => sequence[i]);
  }, [controls, letters, delay, speed]);

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          initial={{ opacity: 0 }}
          animate={controls}
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}
