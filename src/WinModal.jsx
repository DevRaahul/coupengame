import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CongratsModal({ isOpen, onClose }) {
  const [displayText, setDisplayText] = useState("");
  const message = "🎉 Congratulations! You won! 🎯";

  useEffect(() => {
    if (isOpen) {
      setDisplayText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + message[i]);
        i++;
        if (i === message.length) clearInterval(interval);
      }, 80); // typing speed in ms
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h2 className="text-2xl font-bold text-pink-500 mb-4">{displayText}</h2>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
