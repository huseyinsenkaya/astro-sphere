import { useState } from "react";

//firebase
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL();

      // add display name and thumbnail to user
      await response.user.updateProfile({
        displayName,
        photoURL: imgUrl,
      });

      // create a user document
      await projectFirestore.collection("users").doc(response.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({
        type: "LOGIN",
        payload: response.user,
      });

      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
