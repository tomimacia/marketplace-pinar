import { collection, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../useLocalStorage";
import { firestore } from "../../../firebase/clientApp";
import { useCategoria } from "../../../contexts/productsContext";

export const useGetSections = () => {
  const categoria = useCategoria()
  const [sections, setSections] = useState([]);
  const [categorias, setCategorias] = useLocalStorage(
    "CATEGORIAS_STORAGE_SESSION_CONTEXT",
    []
  );
  const [sectionError, setSectionError] = useState(null);
  const catCollectionRef = collection(firestore, "Categorias");
  const catStorageRef = useRef(true);

  useEffect(() => {
    if (!categorias.length && catStorageRef.current) {
      const getCategorias = async () => {
        const data = await getDocs(catCollectionRef);
        const catFetched = data.docs.map((cat) => ({
          ...cat.data(),
          id: cat.id,
        }));
        sessionStorage.setItem(
          "CATEGORIAS_STORAGE_SESSION_CONTEXT",
          JSON.stringify(catFetched)
        );
        setCategorias(catFetched);
        console.log("rendered categorias");
      };
      try {
        getCategorias();
      } catch (err) {
        setSectionError(err);
        console.log(err);
      }
    }
  }, [categorias]);
  useEffect(() => {
    if (categoria && categorias.length > 0) {
      const catSel = categorias.filter((cat) => categoria === cat.id);
      setSections(catSel[0]?.SubCat1);
    }
  }, [categoria]);  
  return { sections, sectionError };
};
