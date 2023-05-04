import { useState } from "react";

//firebase
import { projectAuth, projectFirestore } from "../firebase/config";
// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //update online status
      await projectFirestore
        .collection("users")
        .doc(res.user.uid)
        .update({ online: true });

      //dispatch login action
      dispatch({
        type: "LOGIN",
        payload: res.user,
      });

      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending };
};
