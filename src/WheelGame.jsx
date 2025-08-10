import { useState } from "react";
import confetti from "canvas-confetti";
import Heading from "./Heading";

const slices = ["1%", "2%", "5%", "F.S.C-1", "F.S.C-2", "Gift 1", "Gift 2", "Gift 3"];
const colors = ["#0046FF", "#FF7A30", "#640D5F", "#447D9B", "#EA5B6F", "#9B177E", "#06923E", "#B771E5"];
const size = 500; // Changed to 500
const radius = size / 2;

const polarToCartesian = (angle) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: radius + radius * Math.cos(rad),
    y: radius + radius * Math.sin(rad),
  };
};

const describeArc = (startAngle, endAngle) => {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [`M ${radius} ${radius}`, `L ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, "Z"].join(" ");
};

const WheelGame = () => {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;

    const sliceAngle = 360 / slices.length;
    const randomIndex = Math.floor(Math.random() * slices.length);
    const offset = sliceAngle / 2;
    const angleToStop = 360 * 5 + (360 - randomIndex * sliceAngle - offset);

    setRotation(angleToStop);
    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      setResult(slices[randomIndex]);
      setIsSpinning(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }, 4000);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">
      <Heading />
      {/* <h3 className="text-4xl font-bold mb-12">🎡 Spin the Wheel</h3> */}

      <div className="relative" style={{ width: size, height: size, marginBottom: "1.5rem" }}>
        {/* Pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 rotate-180"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size * 0.03}px solid transparent`,
            borderRight: `${size * 0.03}px solid transparent`,
            borderBottom: `${size * 0.06}px solid white`,
          }}
        />

        <svg width={size} height={size} className="transition-transform duration-[4s] ease-out" style={{ transform: `rotate(${rotation}deg)` }}>
          {slices.map((label, index) => {
            const startAngle = (index * 360) / slices.length;
            const endAngle = ((index + 1) * 360) / slices.length;
            return <path key={index} d={describeArc(startAngle, endAngle)} fill={colors[index % colors.length]} />;
          })}

          {slices.map((label, index) => {
            const angle = (index + 0.5) * (360 / slices.length);
            const rad = (angle - 90) * (Math.PI / 180);
            const x = radius + (radius - size * 0.08) * Math.cos(rad);
            const y = radius + (radius - size * 0.08) * Math.sin(rad);
            return (
              <text key={index} x={x} y={y} fill="white" fontSize={size * 0.035} fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                {label}
              </text>
            );
          })}
        </svg>

        {/* Center circle */}
        <div
          className="absolute rounded-full bg-gray-900 z-10"
          style={{
            width: size * 0.06,
            height: size * 0.06,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <button
        onClick={spin}
        className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        {"Spin 🎡 N Win 🎉"}
      </button>

      {result !== null && (
        <p className="text-2xl">
          🎉 You got: <span className="text-green-400 font-bold">{result}</span>
        </p>
      )}
    </div>
  );
};

export default WheelGame;

// import { useState } from "react";
// import confetti from "canvas-confetti";
// import { motion } from "framer-motion";

// const slices = ["1", "2", "5", "fsc1", "fsc2", "g1", "g2", "g3"];
// const colors = ["#086272", "#1abc9c", "#2ecc70", "#f1c40e", "#e77e23", "#e74c3c", "#9b59b6", "#34495e"];

// export default function WheelGame() {
//   const size = 500; // wheel size
//   const radius = size / 2;
//   const [rotation, setRotation] = useState(0);
//   const [spinning, setSpinning] = useState(false);

//   const polarToCartesian = (angle, r = radius) => {
//     const rad = (angle - 90) * (Math.PI / 180);
//     return {
//       x: radius + r * Math.cos(rad),
//       y: radius + r * Math.sin(rad),
//     };
//   };

//   const describeArc = (startAngle, endAngle) => {
//     const start = polarToCartesian(startAngle);
//     const end = polarToCartesian(endAngle);
//     const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
//     return [`M ${radius} ${radius}`, `L ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, "Z"].join(" ");
//   };

//   const spin = () => {
//     if (spinning) return;
//     setSpinning(true);
//     const randomSpin = 360 * 5 + Math.floor(Math.random() * 360);
//     const newRotation = rotation + randomSpin;

//     setRotation(newRotation);
//     setTimeout(() => {
//       setSpinning(false);
//       confetti();
//     }, 4000);
//   };

//   return (
//     <div className="flex flex-col items-center gap-6">
//       {/* Title */}
//       <motion.h1
//         className="text-[8rem] font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
//         animate={{ scale: [1, 1.15, 1] }}
//         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//       >
//         Priyaneel Motors
//       </motion.h1>
//       <motion.h2
//         className="text-4xl font-semibold text-gray-200 -mt-6"
//         animate={{ scale: [1, 1.05, 1] }}
//         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//       >
//         Spin & Win
//       </motion.h2>

//       {/* Wheel */}
//       <motion.svg
//         width={size}
//         height={size}
//         viewBox={`0 0 ${size} ${size}`}
//         style={{ rotate: `${rotation}deg` }}
//         transition={{ duration: 4, ease: "easeOut" }}
//         className="rounded-full shadow-lg"
//       >
//         {slices.map((label, index) => {
//           const startAngle = (index * 360) / slices.length;
//           const endAngle = ((index + 1) * 360) / slices.length;

//           // Slice path
//           const slicePath = describeArc(startAngle, endAngle);

//           // Text arc path (slightly inside)
//           const textRadius = radius * 0.75;
//           const start = polarToCartesian(startAngle, textRadius);
//           const end = polarToCartesian(endAngle, textRadius);
//           const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
//           const textArcPath = [`M ${start.x} ${start.y}`, `A ${textRadius} ${textRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`].join(" ");

//           return (
//             <g key={index}>
//               <path d={slicePath} fill={colors[index % colors.length]} />
//               <path id={`textPath${index}`} d={textArcPath} fill="none" />
//               <text fontSize={size * 0.04} fontWeight="bold" fill="white">
//                 <textPath href={`#textPath${index}`} startOffset="50%" textAnchor="middle">
//                   {label}
//                 </textPath>
//               </text>
//             </g>
//           );
//         })}
//       </motion.svg>

//       {/* Spin button */}
//       <button
//         onClick={spin}
//         disabled={spinning}
//         className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
//       >
//         {spinning ? "Spinning..." : "Spin"}
//       </button>
//     </div>
//   );
// }
