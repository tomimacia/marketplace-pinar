import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { getSingleDoc } from "../../../firebase/services/getSingleDoc";
import { useSessionStorage } from "../storageHooks/useSessionStorage";
import { useCustomToast } from "../useCustomToast";

export const useHandleFav = () => {
  const [favLoading, setFavLoading] = useState(false);
  const [fetchFavsLoading, setFetchFavsLoading] = useState(false);
  const [selectedProd, setSelectedProd] = useState(0);
  const [favoriteList, setFavoritelist] = useSessionStorage(
    "FAVORITOS_STORAGE_SESSION_CONTEXT",
    []
  );
  const [favFetched, setFavFetched] = useSessionStorage(
    "FAV_SESION_FETCHED",
    false
  );
  const { errorToast, successToast } = useCustomToast();
  const [user, loading, error] = useAuthState(auth);

  const getFavoriteList = useCallback(async () => {
    const usuario = await getSingleDoc("users", user.uid);
    const favoritos = usuario.data().favoritos;

    console.log("fetched Fav Data");
    setFavoritelist(favoritos);
  });
  useEffect(() => {
    if (favoriteList.length > 0 || favFetched) return;
    setFetchFavsLoading(true);
    try {
      getFavoriteList();
      setFavFetched(true);
    } catch (e) {
      console.log(e);
    } finally {
      setFetchFavsLoading(false);
    }
  }, []);
  const handleFavorito = async (prop, numProp) => {
    if (favLoading) return;
    if (!user) {
      errorToast("Log in to add favorites");
      return;
    }
    setFavLoading(true);
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

    successToast(
      ind === -1 ? `Añadido correctamente` : `Eliminado correctamente`
    );
    setFavLoading(false);
    setSelectedProd(0);
  };
  return {
    favoriteList,
    selectedProd,
    fetchFavsLoading,
    favLoading,
    handleFavorito,
  };
};
