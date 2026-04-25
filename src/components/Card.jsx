import React, { useState } from "react";
import { CalendarDays, Trash2 , Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTask, setSelectedTask } from "../store/todoSlice";
import EditModal from "./EditModal"; // ✅ new modal
import toast from "react-hot-toast";


const Card = ({ task }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);

   const handleDelete = (e) => {
    e.stopPropagation(); // ❗ prevent opening details panel
    dispatch(deleteTask(task.id));
    toast.success("Task deleted successfully ✅");
  };


  return (
    <>
      <div
        onClick={() => dispatch(setSelectedTask(task))}
        className="bg-[#111] border border-gray-800 rounded-xl p-3 text-white shadow-md cursor-pointer hover:border-gray-600 transition"
      >

        {/* Top: Title + Edit */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-semibold leading-snug">
            {task.title}
          </h3>

          {/* ✅ Edit Icon */}
          <Pencil
            size={16}
            className="text-gray-400 cursor-pointer hover:text-white"
            onClick={(e) => {
              e.stopPropagation(); // ❗ prevent opening details panel
              setShowEdit(true);
            }}
          />
        </div>

        {/* Image */}
        {task.image && (
          <img
            src={task.image}
            alt="task"
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
        )}

        {/* Bottom Row */}
        <div className="flex justify-between items-center text-gray-400 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CalendarDays size={14} />
              <span>{task.date}</span>
            </div>

          <Trash2
              size={14}
              className=" cursor-pointer hover:text-red-500"
              onClick={handleDelete}
            />

          </div>
        </div>
      </div>

      {/* ✅ Edit Modal */}
      {showEdit && (
        <EditModal task={task} onClose={() => setShowEdit(false)} />
      )}
    </>
  );
};

export default Card;