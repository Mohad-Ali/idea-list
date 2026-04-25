import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "../components/Column";
import { logout } from "../store/authSlice";
import CreateModal from "../components/CreateModal"; // ✅ import modal
import TaskDetails from "../components/TaskDetails";
import toast from "react-hot-toast";

const HomePage = () => {
  const { ideas, inProgress, review, complete,selectedTask  } = useSelector(
    (state) => state.todos
  );

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false); // ✅ modal state

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully 👋"); 
  };

  return (
    <div className="min-h-screen bg-black p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-lg md:text-2xl font-bold">Magic Ideas</h1>

        <div className="flex gap-2">

          {/* ✅ Open Modal */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 px-4 py-2 text-sm md:text-base rounded text-white"
          >
            + Create Idea
          </button>

          {/* ✅ Logout */}
          <button
            onClick={handleLogout}
            className="bg-gray-700 px-4 py-2 rounded text-sm md:text-base text-white hover:bg-gray-600"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Columns */}
      <div className="flex-row md:flex gap-4 overflow-x-auto">
        <Column title="Ideas" items={ideas} type="ideas" />
        <Column title="In Progress" items={inProgress} type="inProgress" />
        <Column title="Review" items={review} type="review" />
        <Column title="Complete" items={complete} type="complete" />
      </div>

      {selectedTask && <TaskDetails task={selectedTask} />}

      {/* ✅ Modal Render */}
      {showModal && (
        <CreateModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default HomePage;