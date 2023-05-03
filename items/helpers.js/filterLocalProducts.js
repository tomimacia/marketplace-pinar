import {
  useDescuento,
  useMarcasPicked,
  useProductOrder,
  useSearchInputValue,
} from "../../contexts/productsContext";

export const filterLocalProducts = (products) => {
  const descuento = useDescuento();
  const marcasPicked = useMarcasPicked();
  const searchInputValue = useSearchInputValue().map(value=>value.toLowerCase());
  const productOrder = useProductOrder();  
  const productMatchingScore = (product) => {
    const score = product.SearchValues.reduce(
      (acc, elem, index) => (searchInputValue.includes(elem) ? acc + product.SearchValues.length - index : acc),
      0
    );    
    return score;
  };
  const filtered = products.filter(
    (prd) =>
      (descuento > 0 ? prd.Descuento >= descuento : prd) &&
      (marcasPicked.length > 0 ? marcasPicked.includes(prd.Marca) : prd)
  );
  if (searchInputValue.length && !productOrder) {    
    filtered.sort((a, b) => {
      if (productMatchingScore(a) > productMatchingScore(b)) return -1;
      if (productMatchingScore(a) < productMatchingScore(b)) return 1;
      if (productMatchingScore(a) === productMatchingScore(b)) {
      }
      return 0;
    });
  }
  return filtered;
};
