import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/todoSlice";
import toast from "react-hot-toast";

const CreateModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [channel, setChannel] = useState("");

  // handle image preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!title) return;

    dispatch(
      addTask({
        id: Date.now(),
        title,
        content,
        image,
        tags,
        channel,
        date: new Date().toLocaleDateString(),
      })
    );
    toast.success("Task created successfully ✅");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0f0f0f] text-white w-full max-w-2xl p-6 rounded-xl border border-gray-800">

        {/* Header */}
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>

        <div className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input
              placeholder="Enter title..."
              className="w-full mt-1 p-3 rounded-lg bg-white/5 border border-gray-700 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm text-gray-400">Content</label>
            <textarea
              placeholder="Start Writing"
              className="w-full mt-1 p-3 h-32 rounded-lg bg-white/5 border border-gray-700 focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="flex justify-between items-center border border-dashed border-gray-700 p-3 rounded-lg">
            <span className="text-gray-400 text-sm">Upload Image</span>
            <input type="file" onChange={handleImageUpload} />
          </div>

          {/* Preview */}
          {image && (
            <img
              src={image}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

          {/* Tags + Channel */}
          <div className="flex gap-4">

            <select
              className="w-1/2 p-3 rounded-lg bg-white/5 border border-gray-700"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            >
              <option className="bg-gray-800" value="">Tags</option>
              <option className="bg-gray-800" value="Fitness">Fitness</option>
              <option className="bg-gray-800" value="Tech">Tech</option>
              <option className="bg-gray-800" value="SEO">SEO</option>
            </select>

            <select
              className="w-1/2 p-3 rounded-lg bg-white/5 border border-gray-700"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option className="bg-gray-800" value="">Channel</option>
              <option className="bg-gray-800" value="YouTube">YouTube</option>
              <option className="bg-gray-800" value="Instagram">Instagram</option>
              <option className="bg-gray-800" value="Blog">Blog</option>
            </select>

          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            ✨ Add Idea
          </button>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full text-gray-400 text-sm mt-2"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateModal;