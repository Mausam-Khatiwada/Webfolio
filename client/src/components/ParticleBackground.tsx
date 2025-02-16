import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Line {
  id: number;
  startX: number;
  startY: number;
  length: number;
  angle: number;
  duration: number;
  delay: number;
}

interface SmallLine {
  id: number;
  startX: number;
  startY: number;
  length: number;
  angle: number;
  duration: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  const [lines, setLines] = useState<Line[]>([]);
  const [smallLines, setSmallLines] = useState<SmallLine[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [zigzagOpacity, setZigzagOpacity] = useState(0);
  const [zigzagPosition, setZigzagPosition] = useState({ x: -100, y: 100 });
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState(0);

  // Zigzag animation
  useEffect(() => {
    
    const animate = () => {
      setZigzagPosition(prev => {
        const newX = prev.x + 3;
        let newY = prev.y;
        
        if (phase === 0) {
          newY = prev.y + (direction * 2);
          if (newY > 300 || newY < 100) {
            setDirection(prev => prev * -1);
            setPhase(1);
          }
        } else {
          if (newY === 300 || newY === 100) {
            setPhase(0);
          }
        }
        
        if (newX > window.innerWidth + 100) {
          return { x: -100, y: 100 };
        }
        
        return { x: newX, y: newY };
      });
      
      setZigzagOpacity(prev => {
        if (zigzagPosition.x < 0) return 0;
        if (zigzagPosition.x > window.innerWidth) return 0;
        return Math.sin(Date.now() / 500) * 0.5 + 0.5;
      });
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const createLine = useCallback((width: number, height: number): Line => {
    const isHorizontal = Math.random() > 0.5;
    let startX, startY;
    let angle;

    if (isHorizontal) {
      startX = Math.random() * width;
      startY = Math.random() > 0.5 ? -20 : height + 20;
      angle = startY < 0 ? Math.random() * 45 + 45 : Math.random() * 45 + 225;
    } else {
      startX = Math.random() > 0.5 ? -20 : width + 20;
      startY = Math.random() * height;
      angle = startX < 0 ? Math.random() * 45 : Math.random() * 45 + 135;
    }

    return {
      id: Math.random(),
      startX,
      startY,
      length: Math.random() * 100 + 50,
      angle,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    };
  }, []);

  const createSmallLine = useCallback((width: number, height: number): SmallLine => {
    // Create smaller lines that can start from anywhere and move in any direction
    return {
      id: Math.random(),
      startX: Math.random() * width,
      startY: Math.random() * height,
      length: Math.random() * 30 + 10, // Smaller length than regular lines
      angle: Math.random() * 360, // Any direction
      duration: Math.random() * 1.5 + 0.5, // Faster movement
      delay: Math.random() * 2,
    };
  }, []);

  const createParticle = useCallback((width: number, height: number): Particle => ({
    id: Math.random(),
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }), []);

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const lineCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 50000), 20);
    const smallLineCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 40000), 30);
    const particleCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 30000), 30);

    const newLines = Array.from({ length: lineCount }, () =>
      createLine(dimensions.width, dimensions.height)
    );

    const newSmallLines = Array.from({ length: smallLineCount }, () =>
      createSmallLine(dimensions.width, dimensions.height)
    );

    const newParticles = Array.from({ length: particleCount }, () =>
      createParticle(dimensions.width, dimensions.height)
    );

    setLines(newLines);
    setSmallLines(newSmallLines);
    setParticles(newParticles);

    // Refresh elements periodically
    const interval = setInterval(() => {
      setLines(prev => [
        ...prev.slice(1),
        createLine(dimensions.width, dimensions.height),
      ]);
      setSmallLines(prev => [
        ...prev.slice(1),
        createSmallLine(dimensions.width, dimensions.height),
      ]);
      setParticles(prev => [
        ...prev.slice(1),
        createParticle(dimensions.width, dimensions.height),
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [dimensions, createLine, createSmallLine, createParticle]);

  return (
    <>
      {/* Neon Zigzag */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          width: "150px",
          height: "3px",
          background: "linear-gradient(90deg, transparent, #ff69b4, transparent)",
          boxShadow: "0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4",
          borderRadius: "4px",
          left: zigzagPosition.x - 75,
          top: zigzagPosition.y,
          opacity: zigzagOpacity,
          transform: `rotate(${phase === 0 ? (direction > 0 ? 45 : -45) : 0}deg)`,
        }}
      />

      {/* Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Animated Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Regular Lines */}
        {lines.map((line) => {
          const endX = line.startX + Math.cos(line.angle * (Math.PI / 180)) * line.length * 2;
          const endY = line.startY + Math.sin(line.angle * (Math.PI / 180)) * line.length * 2;

          return (
            <motion.div
              key={line.id}
              className="absolute bg-primary/10"
              initial={{
                opacity: 0,
                x: line.startX,
                y: line.startY,
                width: 0,
                height: 1,
                rotate: line.angle,
                transformOrigin: "left",
              }}
              animate={{
                opacity: [0, 0.2, 0],
                width: [0, line.length, 0],
                x: [line.startX, endX],
                y: [line.startY, endY],
              }}
              transition={{
                duration: line.duration,
                delay: line.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          );
        })}

        {/* Small Moving Lines */}
        {smallLines.map((line) => {
          const endX = line.startX + Math.cos(line.angle * (Math.PI / 180)) * line.length;
          const endY = line.startY + Math.sin(line.angle * (Math.PI / 180)) * line.length;

          return (
            <motion.div
              key={line.id}
              className="absolute bg-primary/5"
              initial={{
                opacity: 0,
                x: line.startX,
                y: line.startY,
                width: 0,
                height: 0.5, // Thinner lines
                rotate: line.angle,
                transformOrigin: "left",
              }}
              animate={{
                opacity: [0, 0.15, 0],
                width: [0, line.length, 0],
                x: [line.startX, endX],
                y: [line.startY, endY],
              }}
              transition={{
                duration: line.duration,
                delay: line.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 1,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Glowing Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: `hsl(var(--primary))`,
              boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary))`,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </>
  );
}