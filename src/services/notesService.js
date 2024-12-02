import { databases } from "./appwriteConfig";
import { Permission, Role, ID, Query } from "appwrite";

const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const collectionId = process.env.REACT_APP_APPWRITE_COLLECTION_ID;
console.log("Database ID:", process.env.REACT_APP_APPWRITE_DATABASE_ID);
console.log("Collection ID:", process.env.REACT_APP_APPWRITE_COLLECTION_ID);

const generateUserId = () => {
  return localStorage.getItem("userId") || (() => {
    const newUserId = ID.unique();
    localStorage.setItem("userId", newUserId);
    return newUserId;
  })();
};

export const addNote = async (note) => {
  try {
    const userId = generateUserId();

    if (!note.title || !note.body) {
      throw new Error("Note title and body are required to create a note.");
    }

    const noteWithUserId = { ...note, userId };

    const response = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      noteWithUserId,
      [
        Permission.read(Role.any()),   // Read permissions
        Permission.update(Role.any()), // Update permissions
        Permission.delete(Role.any())  // Delete permissions
      ]
    );

    return { id: response.$id, ...noteWithUserId }; // Return the created note with ID
  } catch (error) {
    console.error("Error adding note:", {
      errorMessage: error.message,
      stack: error.stack,
      note,
    });
    throw error;
  }
};

/**
 * Get all notes from the database.
 * @returns {Array} 
 */
export const getNotes = async () => {
  try {

    // the auto-generated userId to fetch notes for the current user
    const userId = generateUserId();

    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("userId", userId),
    ]);


    return response.documents.map((doc) => ({
      id: doc.$id,
      ...doc,
    }));
  } catch (error) {
    console.error("Error fetching notes:", {
      errorMessage: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

/**
 * Update an existing note in the database.
 * @param {string} id - The document ID of the note to update.
 * @param {Object} updatedFields - The fields to update in the note.
 * @returns {Object} - The updated note object.
 */
export const updateNote = async (id, updatedFields) => {
  try {

    if (!id || typeof id !== "string") {
      throw new Error("Invalid note ID provided for update.");
    }

    const response = await databases.updateDocument(
      databaseId,
      collectionId,
      id,
      updatedFields
    );


    return { id: response.$id, ...updatedFields };
  } catch (error) {
    console.error("Error updating note:", {
      errorMessage: error.message,
      stack: error.stack,
      id,
      updatedFields,
    });
    throw error;
  }
};

/**
 * Delete a note from the database.
 * @param {string} id - The document ID of the note to delete.
 */
export const deleteNoteFromBackend = async (id) => {
  try {

    if (!id || typeof id !== "string") {
      throw new Error("Invalid note ID provided for deletion.");
    }

    await databases.deleteDocument(databaseId, collectionId, id);

  } catch (error) {
    console.error("Error deleting note:", {
      errorMessage: error.message,
      stack: error.stack,
      id,
    });
    throw error;
  }
};
