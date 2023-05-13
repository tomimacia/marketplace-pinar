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
  const findUser = async () => {
    setUserRef("loadingUser");
    const usuario = await getSingleDoc("users", user.uid);

    if (userRef != usuario.data()) setUserRef(usuario.data());
    if (
      (user.displayName === null || !usuario.data()) &&
      router.pathname !== "/clientPages/ConfirmUserDetails"
    )
      router.push("/clientPages/ConfirmUserDetails");
  };
  useEffect(() => {
    if (user) {
      findUser();
    } else setUserRef("offline");
  }, [user, user?.displayName]);

  return (
    <context.Provider
      value={{ userRef: userRef || "offline", updateUser: findUser }}
    >
      {children}
    </context.Provider>
  );
};
