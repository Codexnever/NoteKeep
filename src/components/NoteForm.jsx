import React, { useState } from "react";
import { toast } from "react-toastify";
import { addNote } from "../services/notesService"; 

const NoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !body) {
      toast.error("Title and Body are required!");
      return;
    }
  
    const newNote = { title, tagline, body, isPinned: false };
    try {
      await addNote(newNote); // This will send the note to the Appwrite DB
      toast.success("Note added successfully!");
      setTitle("");
      setTagline("");
      setBody("");
      onAdd(newNote); 
    } catch (error) {
      toast.error("Failed to add note.");
    }
  };
  

  return (
    <form
      className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-4"
      onSubmit={handleSubmit}
    >
      <div className="flex-1">
        <label
          className="block text-sm font-medium text-gray-600 mb-1"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex-1">
        <label
          className="block text-sm font-medium text-gray-600 mb-1"
          htmlFor="tagline"
        >
          Tagline
        </label>
        <input
          type="text"
          id="tagline"
          placeholder="Enter a brief tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

     
      <div className="flex-[2]">
        <label
          className="block text-sm font-medium text-gray-600 mb-1"
          htmlFor="body"
        >
          Body
        </label>
        <input
          type="text"
          id="body"
          placeholder="Write something meaningful that matters..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
