import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/todoSlice.js";
import toast from "react-hot-toast";

const EditModal = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content || "");
  const [image, setImage] = useState(task.image || null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    dispatch(
      updateTask({
        ...task,
        title,
        content,
        image,
      })
    );
    toast.success("Task updated successfully ✅");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] text-white w-full max-w-lg p-6 rounded-xl">

        <h2 className="text-lg font-semibold mb-4">Edit Idea</h2>

        <div className="space-y-4">

          <input
            className="w-full p-2 bg-white/10 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-2 bg-white/10 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input type="file" onChange={handleImageUpload} />

          {image && (
            <img
              src={image}
              className="w-full h-32 object-cover rounded"
            />
          )}

          <div className="flex justify-end gap-2">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={handleUpdate}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditModal;