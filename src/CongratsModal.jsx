import { motion, AnimatePresence } from "framer-motion";

const CongratsModal = ({ isOpen, handleModal, result }) => {
  const userData = JSON.parse(localStorage.getItem("data"));
  let strData = `Congratulations! ${userData.name}!`;
  let resultData = `You won ${result} for your purchase of ${userData.bike}.`;

  const getLetters = (data) => {
    let char = [];
    char.push("🎊");
    data.forEach((dt) => {
      char.push(...dt.split(""));
      char.push(" ");
    });
    char.push("🎊");
    return char;
  };

  // Split into characters
  const letters = getLetters(strData.split(" "));
  const resultLetters = getLetters(resultData.split(" "));

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 inline-block max-w-[90vw] whitespace-pre-wrap text-center shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h2 className="text-3xl font-bold text-pink-500 mb-4 flex flex-wrap justify-center">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05, // typing speed
                    duration: 0.3,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
            <h3 className="text-xl font-bold text-emerald-700 mb-4 flex flex-wrap justify-center">
              {resultLetters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05, // typing speed
                    duration: 0.3,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h3>

            <button onClick={handleModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Reset
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CongratsModal;
