import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface Trace {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

export const CircuitBackground = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [traces, setTraces] = useState<Trace[]>([]);

  useEffect(() => {
    // Generate random nodes
    const generatedNodes: Node[] = [];
    for (let i = 0; i < 30; i++) {
      generatedNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      });
    }
    setNodes(generatedNodes);

    // Generate traces connecting some nodes
    const generatedTraces: Trace[] = [];
    for (let i = 0; i < 20; i++) {
      const startNode = generatedNodes[Math.floor(Math.random() * generatedNodes.length)];
      const endNode = generatedNodes[Math.floor(Math.random() * generatedNodes.length)];
      if (startNode && endNode && startNode.id !== endNode.id) {
        generatedTraces.push({
          id: i,
          x1: startNode.x,
          y1: startNode.y,
          x2: endNode.x,
          y2: endNode.y,
          delay: Math.random() * 3,
        });
      }
    }
    setTraces(generatedTraces);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* PCB Grid */}
      <div className="absolute inset-0 pcb-grid opacity-40" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      {/* SVG Circuit traces */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(30 70% 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(30 70% 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(30 70% 50%)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {traces.map((trace) => (
          <motion.line
            key={trace.id}
            x1={`${trace.x1}%`}
            y1={`${trace.y1}%`}
            x2={`${trace.x2}%`}
            y2={`${trace.y2}%`}
            stroke="url(#traceGradient)"
            strokeWidth="1"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0.3] }}
            transition={{
              duration: 3,
              delay: trace.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Animated nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scanning line */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Orbiting elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-copper shadow-lg"
          style={{ boxShadow: "0 0 20px hsl(30 70% 50% / 0.5)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -left-32 top-0 w-2 h-2 rounded-full bg-primary" />
        </motion.div>
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-accent"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -left-24 top-0 w-1.5 h-1.5 rounded-full bg-gold" />
        </motion.div>
      </div>

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
    </div>
  );
};
