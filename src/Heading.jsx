import { motion } from "framer-motion";

export default function Heading() {
  return (
    <svg viewBox="0 0 1200 350" className="w-full h-auto max-h-[50vh] mx-auto" preserveAspectRatio="xMidYMid meet">
      {/* Animated neon gradient */}
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="200%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6">
            <animate attributeName="stop-color" values="#3B82F6; #06b6d4; #8b5cf6; #3B82F6" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#EC4899">
            <animate attributeName="stop-color" values="#EC4899; #f43f5e; #f97316; #EC4899" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#3B82F6">
            <animate attributeName="stop-color" values="#3B82F6; #06b6d4; #8b5cf6; #3B82F6" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Glow filter */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main curve */}
      <path id="curveMain" d="M 100 250 Q 600 50 1100 250" fill="transparent" />

      {/* Sub curve */}
      <path id="curveSub" d="M 200 300 Q 600 150 1000 300" fill="transparent" />

      {/* Main heading */}
      <motion.text
        fontSize="80"
        fontWeight="bold"
        fill="url(#neonGradient)"
        filter="url(#neonGlow)"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <textPath href="#curveMain" startOffset="50%" textAnchor="middle">
          PriyaNil Motors
        </textPath>
      </motion.text>

      {/* Sub-heading */}
      <motion.text
        fontSize="42"
        fontWeight="600"
        fill="url(#neonGradient)"
        filter="url(#neonGlow)"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <textPath href="#curveSub" startOffset="50%" textAnchor="middle">
          Sales & Services
        </textPath>
      </motion.text>
    </svg>
  );
}
