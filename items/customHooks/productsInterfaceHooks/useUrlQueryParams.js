import { useEffect } from "react";
import {
  useReset,
  useSetCategoria,
  useSetSearchInputValue,
  useSetSubCat1,
} from "../../../contexts/productsContext";

export const useUrlQueryParams = (router) => {
  const setCategoria = useSetCategoria();
  const setSubCat1 = useSetSubCat1();
  const setSearchInputValue = useSetSearchInputValue();
  const reset = useReset();
  const rqCategory = router.query.Category;
  const rqSubCat1 = router.query.SubCat1;
  const rqSearchInputvalue = router.query.SearchInputValue;
  useEffect(() => {
    if (rqSearchInputvalue) setSearchInputValue(rqSearchInputvalue.split(" "));
    if (rqSubCat1) {
      setSubCat1(rqSubCat1);
    } else setSubCat1(null);
    if (rqCategory) setCategoria(rqCategory);
    if ([rqSubCat1, rqCategory, rqSearchInputvalue].every((value) => !value))
      reset();
  }, [router]);
};
