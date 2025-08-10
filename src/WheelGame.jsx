import { useState } from "react";
import confetti from "canvas-confetti";
import Heading from "./Heading";

const slices = ["Cashback 1%", "Cashback 2%", "Cashback 5%", "Free Service X1", "Free Service X2", "Gift 1", "Gift 2", "Gift 3"];
const colors = ["#0046FF", "#FF7A30", "#640D5F", "#447D9B", "#EA5B6F", "#F3C623", "#06923E", "#B771E5"];
const size = 500; // Changed to 500
const radius = size / 2;

const polarToCartesian = (angle) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: radius + radius * Math.cos(rad),
    y: radius + radius * Math.sin(rad),
  };
};

const polarToCartesianAngle = (angle, r) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: radius + r * Math.cos(rad),
    y: radius + r * Math.sin(rad),
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
    let angleToStop = 360 * 10 + (360 - randomIndex * sliceAngle - offset);

    setRotation(angleToStop);
    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      setResult(slices[randomIndex]);
      setIsSpinning(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }, 8000);
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

        <svg width={size} height={size} className="transition-transform duration-[8s] ease-out" style={{ transform: `rotate(${rotation}deg)` }}>
          {slices.map((label, index) => {
            const startAngle = (index * 360) / slices.length;
            const endAngle = ((index + 1) * 360) / slices.length;
            return <path key={index} d={describeArc(startAngle, endAngle)} fill={colors[index % colors.length]} />;
          })}

          {/* {slices.map((label, index) => {
            const angle = (index + 0.5) * (360 / slices.length);
            const rad = (angle - 90) * (Math.PI / 180);
            const x = radius + (radius - size * 0.08) * Math.cos(rad);
            const y = radius + (radius - size * 0.08) * Math.sin(rad);
            return (
              <text key={index} x={x} y={y} fill="white" fontSize={size * 0.035} fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                {label}
              </text>
            );
          })} */}
          {/** Inside your SVG replace the text rendering block with this: */}
          <defs>
            {slices.map((label, index) => {
              const startAngle = (index * 360) / slices.length;
              const endAngle = ((index + 1) * 360) / slices.length;

              // Slightly smaller radius for text to sit inside the wheel
              const textRadius = radius - size * 0.12;

              const start = polarToCartesianAngle(startAngle, textRadius);
              const end = polarToCartesianAngle(endAngle, textRadius);
              const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

              return (
                <path
                  key={`path-${index}`}
                  id={`arc-${index}`}
                  d={`M ${start.x} ${start.y} A ${textRadius} ${textRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`}
                  fill="none"
                />
              );
            })}
          </defs>

          {/** Draw labels following arc paths */}
          {slices.map((label, index) => (
            <text key={`text-${index}`} fill="white" fontSize={size * 0.035} fontWeight="bold">
              <textPath href={`#arc-${index}`} startOffset="50%" textAnchor="middle">
                {label}
              </textPath>
            </text>
          ))}
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
