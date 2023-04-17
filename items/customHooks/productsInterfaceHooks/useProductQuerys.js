import { useEffect, useState } from "react";

export const useProductQuerys = (router) => {
  const [categoria, setCategoria] = useState();
  const [subCat1, setSubCat1] = useState();
  const [searchInputValue, setSearchInputvalue] = useState([]);
  const rqCategoria = router.query.categoria;
  const rqSearch = router.query.searchInput;
  const rqSubCat1 = router.query.SubCat1;
  
  useEffect(() => {
    setSubCat1();
    if (rqCategoria) setCategoria(rqCategoria);
    if (rqSubCat1) setSubCat1(rqSubCat1);
    if (rqSearch) {
      setSearchInputvalue(rqSearch.split(" "));
    }
  }, [rqSearch, rqCategoria]);
  return { categoria, subCat1,setSearchInputvalue, setSubCat1, setCategoria, searchInputValue };
};
