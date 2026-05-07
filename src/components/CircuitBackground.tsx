import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Node { id: number; x: number; y: number; delay: number; size: number; }
interface Trace { id: number; x1: number; y1: number; x2: number; y2: number; delay: number; duration: number; }

export const CircuitBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { nodes, traces } = useMemo(() => {
    const rng = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    const generatedNodes: Node[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: rng(i * 7.3) * 100,
      y: rng(i * 3.7) * 100,
      delay: rng(i * 1.9) * 3,
      size: rng(i * 5.1) > 0.7 ? 3 : 2,
    }));

    const generatedTraces: Trace[] = Array.from({ length: 18 }, (_, i) => {
      const start = generatedNodes[Math.floor(rng(i * 2.3) * generatedNodes.length)];
      const end = generatedNodes[Math.floor(rng(i * 4.7) * generatedNodes.length)];
      return {
        id: i,
        x1: start.x, y1: start.y,
        x2: end.x, y2: end.y,
        delay: rng(i * 1.2) * 4,
        duration: 2.5 + rng(i * 3.1) * 3,
      };
    });

    return { nodes: generatedNodes, traces: generatedTraces };
  }, []);

  if (!mounted) return <div className="absolute inset-0 pcb-grid opacity-40" />;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* PCB grid base */}
      <div className="absolute inset-0 pcb-grid opacity-40" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

      {/* SVG traces */}
      <svg className="absolute inset-0 w-full h-full" style={{ willChange: "auto" }}>
        <defs>
          <linearGradient id="traceGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(30 70% 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(30 70% 50%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(30 70% 50%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="traceGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(200 80% 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(200 80% 60%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(200 80% 60%)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {traces.map((trace) => (
          <motion.line
            key={trace.id}
            x1={`${trace.x1}%`} y1={`${trace.y1}%`}
            x2={`${trace.x2}%`} y2={`${trace.y2}%`}
            stroke={trace.id % 2 === 0 ? "url(#traceGrad1)" : "url(#traceGrad2)"}
            strokeWidth="0.8"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2, 0.5, 0] }}
            transition={{
              duration: trace.duration,
              delay: trace.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            willChange: "opacity, transform",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0.8, 1.6, 0.8],
            opacity: [0.2, 0.65, 0.2],
          }}
          transition={{
            duration: 2.5 + node.delay * 0.5,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scanning line */}
      <motion.div
        className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent"
        initial={{ x: "-2px" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        style={{ willChange: "transform" }}
      />

      {/* Center radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/4 blur-3xl" />
      <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/3 blur-3xl" />
    </div>
  );
};
