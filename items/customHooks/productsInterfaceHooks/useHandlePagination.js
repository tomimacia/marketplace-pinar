import { useEffect, useState } from "react";

export const useHandlePagination = (products) => {
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(0);

  const handlePagination = (prop) => {
    setPage(page + prop);
    window.scrollTo(0, 0);
  };
  const setPlusPage = () => {
    setPage(page + 1);
  };
  const setMinusPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    if (products) {
      setPagesTotal(Math.ceil(products.length / 10));
    }    
  }, [products]);
  const pageActions = {setPlusPage, setMinusPage, handlePagination}
  return { page, pagesTotal, pageActions };
};
