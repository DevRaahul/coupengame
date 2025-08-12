import { useEffect, useState } from "react";
import UserModal from "./UserModal";
import WheelGame from "./WheelGame";
import CongratsModal from "./CongratsModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWinModal, setWinModal] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    localStorage.removeItem("data");
    setIsOpen(true);
  }, []);

  const showResultFun = (data) => {
    setResult(data);
  };

  const showCongratsModal = (data) => {
    setWinModal(true);
  };

  const handleModal = (data) => {
    console.log("Name:", data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsOpen(false);
  };

  const handleCongratsModal = () => {
    localStorage.removeItem("data");
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-y-hidden">
      {/* Background Wheel Game */}
      <div className={isOpen ? "blur-sm pointer-events-none" : ""}>
        <WheelGame showCongratsModal={showCongratsModal} showResultFun={showResultFun} />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <UserModal handleModal={handleModal} />
        </div>
      )}
      {showWinModal && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CongratsModal isOpen={showWinModal} handleModal={handleCongratsModal} result={result} />
        </div>
      )}
    </div>
  );
}

export default App;
