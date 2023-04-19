import { create } from "zustand";

const useProduct = create((set) => ({
  categoria: null,
  setCategoria: (newCategoria) => set(() => ({ categoria: newCategoria })),
  marcas: {},
  setMarcas: (newMarcas) => set(() => ({ marcas: newMarcas })),
  priceMinMax: { min: 0, max: Infinity },
  setPriceMinMax: (newMinMax) => set(() => ({ priceMinMax: newMinMax })),
  marcasPicked: [],
  setMarcasPicked: () => set((state) => state.marcasPicked),
  descuento: 0,
  setDescuento: () => set((state) => state.descuento),
  subCat1: null,
  setSubCat1: (newSubCat1) => set(() => ({ subCat1: newSubCat1 })),
  searchInputValue: [],
  setSearchInputValue: () => set((state) => state.searchInputValue),
  productOrder: "none",
  setProductOrder: () => set((state) => state.productOrder),
}));


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
