import React from "react";
import { useDispatch } from "react-redux";
import { clearSelectedTask, moveTask } from "../store/todoSlice";
import { Check } from "lucide-react";

const TaskDetails = ({ task }) => {
  const dispatch = useDispatch();

  // ✅ step order
  const order = ["ideas", "inProgress", "review", "complete"];

  const handleMove = (target) => {
    const currentIndex = order.indexOf(task.status);
    const targetIndex = order.indexOf(target);

    // ✅ allow only step-by-step
    if (Math.abs(targetIndex - currentIndex) === 1) {
      dispatch(moveTask({ to: target, task }));
    }
  };

  const Step = ({ label, column }) => {
    const currentIndex = order.indexOf(task.status);
    const stepIndex = order.indexOf(column);

    const isActive = task.status === column;
    const isAllowed = Math.abs(stepIndex - currentIndex) === 1;

    return (
      <div
        onClick={() => isAllowed && handleMove(column)}
        className={`flex flex-col items-center gap-1 ${
          isAllowed ? "cursor-pointer" : "opacity-40 cursor-not-allowed"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition
          ${
            isActive
              ? "bg-green-500 border-green-500 text-black" // ✅ active
              : "border-gray-600 text-gray-400"
          }`}
        >
          <Check size={14} />
        </div>

        <span
          className={`text-xs ${
            isActive ? "text-green-400" : "text-gray-400"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-[#0f0f0f] border-l border-gray-800 p-5 z-50">

      {/* Close */}
      <button
        onClick={() => dispatch(clearSelectedTask())}
        className="absolute top-4 right-4 text-white"
      >
        ✕
      </button>

      <h2 className="text-xl text-white font-semibold mb-10">Idea Details</h2>

      {/* ✅ Progress Steps */}
      <div className="flex justify-between mb-10">
        <Step label="Ideas" column="ideas" />
        <Step label="In Progress" column="inProgress" />
        <Step label="Review" column="review" />
        <Step label="Complete" column="complete" />
      </div>

      {/* Image */}
      {task.image && (
        <img
          src={task.image}
          className="w-full h-40 object-cover rounded-lg mb-7"
        />
      )}

      {/* Title */}
      <div className="mb-5">
        <p className="text-gray-400 text-sm">Title</p>
        <div className="bg-white/10 text-white/80 p-2 mt-1 rounded">
          {task.title}
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-gray-400 text-sm">Content</p>
        <div className="bg-white/10 text-white/80 p-3 mt-1 rounded text-sm">
          {task.content || "No content"}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;