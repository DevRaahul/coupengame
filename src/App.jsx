import { useEffect, useState } from "react";
import UserModal from "./UserModal";
import WheelGame from "./WheelGame";
import CongratsModal from "./CongratsModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWinModal, setWinModal] = useState(false);

  useEffect(() => {
    localStorage.clear();
    setIsOpen(true);
  }, []);

  const showCongratsModal = (data) => {
    setWinModal(true);
  };

  const handleModal = (data) => {
    console.log("Name:", data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsOpen(false);
  };

  const handleCongratsModal = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Wheel Game */}
      <div className={isOpen ? "blur-sm pointer-events-none" : ""}>
        <WheelGame showCongratsModal={showCongratsModal} />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <UserModal handleModal={handleModal} />
        </div>
      )}
      {showWinModal && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CongratsModal isOpen={showWinModal} handleModal={handleCongratsModal} />
        </div>
      )}
    </div>
  );
}

export default App;
