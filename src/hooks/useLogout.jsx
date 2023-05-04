import { useState, useEffect } from "react";

//firebase
import { projectAuth, projectFirestore } from "../firebase/config";
// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // update online status
      const { uid } = user;
      await projectFirestore.collection("users").doc(uid).update({
        online: false,
      });

      await projectAuth.signOut();

      //dispatch logout action
      dispatch({
        type: "LOGOUT",
      });

      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
