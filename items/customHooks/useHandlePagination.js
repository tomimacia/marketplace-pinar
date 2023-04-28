import { useCallback, useEffect, useState } from "react";

export const useHandlePagination = (products) => {
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(0);

  const setPlusPage = useCallback(() => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  }, [page]);
  const setMinusPage = useCallback(() => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    if (products) {
      setPagesTotal(Math.ceil(products.length / 10));
      if (pagesTotal < 2) setPage(1);
    }
  }, [products]);
  const pageActions = { setPlusPage, setMinusPage };
  return { page, pagesTotal, pageActions };
};
