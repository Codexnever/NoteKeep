import React, { useState } from "react";

const NotePopup = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [tagline, setTagline] = useState(note.tagline);
  const [body, setBody] = useState(note.body);

  const handleSave = () => {
    onSave({ ...note, title, tagline, body });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Note</h2>
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter the note title"
            />
          </div>

          {/* Tagline Input */}
          <div>
            <label
              htmlFor="tagline"
              className="block text-sm font-medium text-gray-700"
            >
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="A short description or tagline"
            />
          </div>

          {/* Body Input */}
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Write your detailed note content here..."
              rows="5"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePopup;
