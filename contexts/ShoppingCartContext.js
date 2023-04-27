import { create } from "zustand";

const useCartZustand = create((set) => ({
  cartContext: 0,
  setCartContext: (newCart) => set(() => ({ cartContext: newCart })),
}));


export const useCartContext = () => useCartZustand((state) => state.cartContext);
export const useSetCartContext = () => useCartZustand((state) => state.setCartContext);
