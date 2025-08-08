import { useState } from "react";
import confetti from "canvas-confetti";

const slices = ["1%", "2%", "5%", "F.S.C-1", "F.S.C-2", "Gift 1", "Gift 2", "Gift 3"];
const colors = ["#f43f5e", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];
const size = 300;
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
      if (randomIndex == 2) {
        alert(randomIndex);
        setResult(slices[1]);
      } else {
        setResult(slices[randomIndex]);
      }
      setIsSpinning(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-6">🎡 Spin the Wheel</h1>

      <div className="relative w-[300px] h-[300px] mb-6">
        {/* Pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-white-500 z-20 rotate-180	" />

        <svg width={size} height={size} className="transition-transform duration-[4s] ease-out" style={{ transform: `rotate(${rotation}deg)` }}>
          {slices.map((label, index) => {
            const startAngle = (index * 360) / slices.length;
            const endAngle = ((index + 1) * 360) / slices.length;
            return <path key={index} d={describeArc(startAngle, endAngle)} fill={colors[index % colors.length]} />;
          })}

          {slices.map((label, index) => {
            const angle = (index + 0.5) * (360 / slices.length);
            const rad = (angle - 90) * (Math.PI / 180);
            const x = radius + (radius - 40) * Math.cos(rad);
            const y = radius + (radius - 40) * Math.sin(rad);
            return (
              <text key={index} x={x} y={y} fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                {label}
              </text>
            );
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 w-[30px] h-[30px] bg-gray-900 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className={`px-6 py-3 rounded font-semibold mb-6 transition ${
          isSpinning ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-white hover:text-black"
        }`}
      >
        {isSpinning ? "Spinning..." : "Spin"}
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
