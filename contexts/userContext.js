import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { getSingleDoc } from "../firebase/services/getSingleDoc";

export const context = createContext();

export const UserProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userRef, setUserRef] = useState(null);

  useEffect(() => {
    if (user) {
      const findUser = async () => {
        const usuario = await getSingleDoc("users", user.uid)
        if (!userRef || userRef != usuario.data()) setUserRef(usuario.data());
      };
      findUser();
    }
  }, [user]);

  useEffect(() => {
    if (userRef !== null) {
      const favs = userRef.favoritos;
      sessionStorage.setItem(
        "FAVORITOS_STORAGE_SESSION_CONTEXT",
        JSON.stringify(favs)
      );
    }
  }, [userRef]);

  return (
    <context.Provider value={userRef || "offline"}>
      {children}
    </context.Provider>
  );
};
