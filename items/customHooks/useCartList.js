import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useSetCartContext } from "../../contexts/ShoppingCartContext";

export const useCartList = () => {
  const setCartContext = useSetCartContext()
  const [cartList, setCartList] = useLocalStorage("CART_CONTEXT_LOCAL_STORAGE", []);
  const deleteCart = () => {
    if (cartList.length > 0) {
      setCartList([]);
    }
  };
  useEffect(()=>{
    setCartContext(cartList.length)
  },[cartList])
  function deleteProduct(prop) {
    setCartList(cartList.filter((prod) => prod !== prop));
  }
  function minusOne(prop) {
    let indice = cartList.indexOf(prop);
    let arr = cartList;
    arr.splice(indice, 1);
    setCartList([...arr]);
  }
  function plusOne(prop) {
    setCartList([...cartList,prop])
  }
  const quantityTotal = (prd) => {
    const sum = prd.reduce((acc, p) => {
      acc =
        acc +
        p.Precio *
          (p.Descuento ? 1 - p.Descuento * 0.01 : 1) *
          cartList.reduce((acc, prod) => {
            return prod === p.id ? acc + 1 : acc;
          }, 0);
      return acc;
    }, 0);
    return sum;
  };
  const actions = {
    deleteCart,
    deleteProduct,
    minusOne,
    plusOne,
  };
  return {
    cartList,
    actions,
    quantityTotal,
  };
};
