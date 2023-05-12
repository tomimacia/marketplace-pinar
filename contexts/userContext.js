import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { getSingleDoc } from "../firebase/services/getSingleDoc";
import { useRouter } from "next/router";

export const context = createContext();

export const UserProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userRef, setUserRef] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      setUserRef("loadingUser")
      const findUser = async () => {
        const usuario = await getSingleDoc("users", user.uid);
        if (userRef != usuario.data()) setUserRef(usuario.data());
        if (user.displayName === null || !usuario.data())
          router.push("clientPages/confirmUserDetails");
      };
      findUser();
    }
  }, [user]);

  return (
    <context.Provider value={userRef || "offline"}>{children}</context.Provider>
  );
};
