import React from "react";

const Pagination = ({ currentPage, totalNotes, notesPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalNotes / notesPerPage);

  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-3 py-1 mx-1 ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
