import { useToast } from "@chakra-ui/react";
import { auth, firestore } from "../../firebase/clientApp";
import { useSessionStorage } from "../../items/customHooks/useSessionStorage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

export const useHandleFav = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedProd, setSelectedProd] = useState(0);
  const [favoriteList, setFavoritelist] = useSessionStorage(
    "FAVORITOS_STORAGE_SESSION_CONTEXT",
    []
  );

  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();

  const handleFavorito = async (prop, numProp) => {
    if(showSpinner) return
    if(!user) {
      toast({
        title: `Log in to add favorites`,
        status: "error",
        isClosable: true,
      });
      return
    }
    setShowSpinner(true);
    setSelectedProd(numProp);
    const ind = favoriteList.indexOf(prop);
    let newArr = [];
    ind === -1
      ? (newArr = [...favoriteList, prop])
      : (newArr = favoriteList.filter((p) => p !== favoriteList[ind]));
    await updateDoc(doc(firestore, "users", user.uid), {
      favoritos: newArr,
    });
    setFavoritelist(newArr);
    sessionStorage.setItem(
      "FAVORITOS_STORAGE_SESSION_CONTEXT",
      JSON.stringify(newArr)
    );

    toast({
      title: ind === -1 ? `Añadido correctamente` : `Eliminado correctamente`,
      status: "success",
      isClosable: true,
    });
    setShowSpinner(false);
    setSelectedProd(0);
  };
  return { favoriteList, selectedProd, showSpinner, handleFavorito };
};
