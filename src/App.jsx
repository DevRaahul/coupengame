import { useEffect, useState } from "react";
import UserModal from "./UserModal";
import WheelGame from "./WheelGame";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.clear();
    setIsOpen(true);
  }, []);

  const handleModal = (data) => {
    console.log("Name:", data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsOpen(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Wheel Game */}
      <div className={isOpen ? "blur-sm pointer-events-none" : ""}>
        <WheelGame />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <UserModal handleModal={handleModal} />
        </div>
      )}
    </div>
  );
}

export default App;
