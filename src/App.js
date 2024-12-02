import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import NotePopup from "./components/NotePopup";
import Pagination from "./components/Pagination";
import { getNotes, deleteNoteFromBackend } from "./services/notesService"; 

const App = () => {
  const [notes, setNotes] = useState([]);
  const [popupNote, setPopupNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);

  const NOTES_PER_PAGE = 6;

  // Fetch notes from the Appwrite database when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes(); 
        setNotes(fetchedNotes); 
      } catch (error) {
        toast.error("Failed to load notes.");
      }
    };

    fetchNotes();
  }, []); 

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    toast.success("Note updated successfully!");
  };

  const togglePin = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
    toast.success("Pin status updated!");
  };

  const deleteNote = (id) => {
    try {
      deleteNoteFromBackend(id); // Delete note from backend
      setNotes(notes.filter((note) => note.id !== id)); 
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  const handleExpand = (id) => {
    setExpandedCard((prevId) => (prevId === id ? null : id)); // Toggle expansion
  };

  const currentNotes = notes
    .filter((note) => note.isPinned)
    .concat(notes.filter((note) => !note.isPinned))
    .slice((currentPage - 1) * NOTES_PER_PAGE, currentPage * NOTES_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 p-1">
      {/* Note Form */}
      <NoteForm onAdd={addNote} />

      <div className="flex items-center justify-center mt-6 mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-lg font-semibold text-gray-500">Your Notes</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Note Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 p-9">
        {currentNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={setPopupNote}
            onPin={togglePin}
            onDelete={deleteNote}
            isExpanded={expandedCard === note.id}
            onExpand={handleExpand}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalNotes={notes.length}
        notesPerPage={NOTES_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {/* Note Popup */}
      {popupNote && (
        <NotePopup
          note={popupNote}
          onClose={() => setPopupNote(null)}
          onSave={updateNote}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
