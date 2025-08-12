import { useEffect, useRef, useState } from "react";

const UserModal = ({ handleModal }) => {
  const [name, setName] = useState("");
  const [bike, setBike] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleModal({ name, bike });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="p-6">
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-120 p-6">
            <h2 className="text-lg font-semibold mb-4">Enter Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <input
                ref={inputRef}
                type="text"
                placeholder="Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Vehicle Name"
                value={bike}
                onChange={(e) => setBike(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-400">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
