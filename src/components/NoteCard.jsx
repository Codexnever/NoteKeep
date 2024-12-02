import React from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";

const NoteCard = ({ note, onEdit, onPin, onDelete, isExpanded, onExpand }) => {
  return (
    <div
      className={`bg-white shadow-md p-4 rounded-lg border border-gray-200 ${
        isExpanded ? "h-auto" : "h-48"
      } overflow-hidden relative`}
      onClick={() => onExpand(note.id)}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onPin(note.id);
            }}
            className="text-yellow-500 hover:text-yellow-600"
          >
            {note.isPinned ? (
              <BsFillPinAngleFill className="text-xl" />
            ) : (
              <BsFillPinAngleFill className="text-xl text-gray-600" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(note.id);
            }}
            className="text-red-500 hover:text-red-600"
          >
            <MdDelete className="text-xl text-gray-500" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 italic mb-2">{note.tagline}</p>

      <p
        className={`text-gray-700 ${
          isExpanded ? "" : "line-clamp-5"
        } transition-all duration-300`}
      >
        {note.body}
      </p>

      {isExpanded && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="px-4 py-2"
          >
            <MdEdit className="text-xl text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      )}

      {!isExpanded && (
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default NoteCard;
