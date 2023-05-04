import { useReducer, useEffect, useState } from "react";
// firebase
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: true,
      };

    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await ref.doc(id).delete();
      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // update documents
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updatedDocument = await ref.doc(id).update(updates);
      return updatedDocument;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      return null;
    }
  };

  return { addDocument, deleteDocument, updateDocument, response };
};
