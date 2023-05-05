import { useCallback, useEffect, useState } from "react";
import { getSingleDoc } from "../../../firebase/services/getSingleDoc";

export const useFavProducts = (favList) => {
  const [products, setProducts] = useState([]);
  const [favProductsLoading, setFavProductsLoading] = useState(false);
  const getFavProducts = useCallback(async(favs) => {
    const docObject = [];
    console.log("Fetch fav products")
    for (let ind in favs) {
      const i = Number(ind);
      const document = await getSingleDoc("Productos", favs[i]);
      docObject.push({ ...document.data(), id: document.id });
    }
    return docObject;
  },[favList]);

  
  useEffect(() => {
    setFavProductsLoading(true);
    if (!products.length && favList.length) {
      getFavProducts(favList)
        .then((res) => {
          setProducts(res);
          setFavProductsLoading(false)
        }).catch((err) => console.error(err));        
    } else {
      const newProds = products.filter(
        (product) => favList.includes(product.id)
      );
      setProducts(newProds);
      setFavProductsLoading(false);
    }
  }, [favList]);
  return { products, favProductsLoading };
};
