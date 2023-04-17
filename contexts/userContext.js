import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";

export const context = createContext();

export const UserProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);  
  const [userRef, setUserRef] = useState(null);

  useEffect(() => {
    if (user) {
      const findUser = async () => {
        const usuario = await getDoc(doc(firestore, "users", user.uid));
        if (!userRef || userRef != usuario.data()) setUserRef(usuario.data());
      };
      findUser();
    }
  }, [user]);
 

  return (
    <context.Provider value={userRef ? userRef : "offline"}>
      {children}
    </context.Provider>
  );
};
