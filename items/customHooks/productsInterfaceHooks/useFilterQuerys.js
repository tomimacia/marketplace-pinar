import { useEffect } from "react";
import {
  useSetCategoria,
  useSetSearchInputValue,
  useSetSubCat1
} from "../../../contexts/productsContext";

export const useFilterQuerys = (router) => {
  const setCategoria = useSetCategoria();
  const setSubCat1 = useSetSubCat1();
  const setSearchInputValue = useSetSearchInputValue();
  const rqCategoria = router.query.categoria;
  const rqSearch = router.query.searchInput;
  const rqSubCat1 = router.query.SubCat1;

  useEffect(() => {
    setSubCat1();
    if (rqCategoria) setCategoria(rqCategoria);
    if (rqSubCat1) setSubCat1(rqSubCat1);
    if (rqSearch) {
      setSearchInputValue(rqSearch.split(" "));
    }
  }, [rqSearch, rqCategoria]);
};
