import { create } from "zustand";

const initialState = {  
  categoria: null,
  marcas: {},
  priceMinMax: { min: 0, max: Infinity },
  marcasPicked: [],
  descuento: 0,
  subCat1: null,
  searchInputValue: [],
  productOrder: "",
};
const initialFilters = {
  descuento: 0,
  marcasPicked: [],
  priceMinMax: { min: 0, max: Infinity }
}
const useProduct = create((set) => ({
  ...initialState,
  setCategoria: (newCategoria) => set(() => ({ categoria: newCategoria })),
  setMarcas: (newMarcas) => set(() => ({ marcas: newMarcas })),
  setPriceMinMax: (newMinMax) => set(() => ({ priceMinMax: newMinMax })),
  setMarcasPicked: (newMarcasP) => set(() => ({marcasPicked:newMarcasP})),
  setDescuento: (newDescuento) => set(() => ({descuento:newDescuento})),
  setSubCat1: (newSubCat1) => set(() => ({ subCat1: newSubCat1 })),
  setSearchInputValue: (newSearchIV) => set(() => ({searchInputValue:newSearchIV})),
  setProductOrder: (newProductsOrder) => set(() => ({productOrder:newProductsOrder})),
  reset: () => {
    set(initialState);
  },
  resetFilters: () => {
    set(initialFilters);
  },
  
}));

export const useProducts = () => useProduct((state) => state.products);
export const useSetProducts = () => useProduct((state) => state.setProducts);
export const useCategoria = () => useProduct((state) => state.categoria);
export const useSetCategoria = () => useProduct((state) => state.setCategoria);
export const useMarcas = () => useProduct((state) => state.marcas);
export const useSetMarcas = () => useProduct((state) => state.setMarcas);
export const useDescuento = () => useProduct((state) => state.descuento);
export const useSetDescuento = () => useProduct((state) => state.setDescuento);
export const usePriceMinMax = () => useProduct((state) => state.priceMinMax);
export const useSetPriceMinMax = () =>
useProduct((state) => state.setPriceMinMax);
export const useMarcasPicked = () => useProduct((state) => state.marcasPicked);
export const useSetMarcasPicked = () =>
  useProduct((state) => state.setMarcasPicked);
export const useSubCat1 = () => useProduct((state) => state.subCat1);
export const useSetSubCat1 = () => useProduct((state) => state.setSubCat1);
export const useSearchInputValue = () =>
  useProduct((state) => state.searchInputValue);
export const useSetSearchInputValue = () =>
  useProduct((state) => state.setSearchInputValue);
export const useProductOrder = () => useProduct((state) => state.productOrder);
export const useSetProductOrder = () =>
  useProduct((state) => state.setProductOrder);
export const useReset = () => useProduct((state) => state.reset);
export const useResetFilters = () => useProduct((state) => state.resetFilters);
