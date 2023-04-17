import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormatProduct } from "../../components/products/FormatProducts";
import ProductTopComp from "../../components/products/ProductTopComp";
import { BusquedaGeneral } from "../../components/products/busquedaGeneral";
import { ProductStructure } from "../../components/products/productStructure";
import { ProductsPagination } from "../../components/products/productsPagination";
import {
  useGetProducts,
  useGetSections,
  useHandlePagination,
  useProductQuerys,
  useQueryArray,
} from "../../items/customHooks/productsInterfaceHooks/productsInterfaceHooks";
import { useHandleFav } from "../../items/customHooks/useHandleFav";
import { useLocalStorage } from "../../items/customHooks/useLocalStorage";

const productos = () => {
  // All function =>

  // local filtering outside database
  const filterProducts = (prop) => {
    const contarPalabras = (prd) => {
      const cuenta = prd.SearchValues.reduce(
        (acc, elem, index) =>
          searchInputValue.includes(elem)
            ? acc + prd.SearchValues.length - index
            : acc,
        0
      );
      return cuenta;
    };
    const newProp = prop.filter(
      (prd) =>
        (descuento > 0 ? prd.Descuento >= descuento : prd) &&
        (marcasPick.length > 0 ? marcasPick.includes(prd.Marca) : prd)
    );
    if (searchInputValue.length && !productOrder) {
      newProp.sort((a, b) => {
        if (contarPalabras(a) > contarPalabras(b)) return -1;
        if (contarPalabras(a) < contarPalabras(b)) return 1;
        if (contarPalabras(a) === contarPalabras(b)) {
        }
        return 0;
      });
    }
    return newProp;
  };

 // state cleaning functions 
  const cleanInput = () => {
    setMarcasPick([]);
    setMarcas({});
    setProducts([]);
    setSearchInputvalue([]);
    router.push(`/productPages/productInterface`);
  };

  const filtersClean = () => {
    if (priceMinMax.min !== 0 || priceMinMax.max !== Infinity) {
      setPriceMinMax({ min: 0, max: Infinity });
    }
    if (descuento > 0 || marcasPick.length > 0) {
      setDescuento(0);
      setMarcasPick([]);
    }
  };
  
  // states/custom hooks
  const router = useRouter();
  const [descuento, setDescuento] = useState(0);
  const [marcasPick, setMarcasPick] = useState([]);
  const { favoriteList, selectedProd, showSpinner, handleFavorito } =
    useHandleFav();
  const [cartList, setCartList] = useLocalStorage("CART_CONTEXT_STORAGE", []);
  const {
    categoria,
    searchInputValue,
    setSearchInputvalue,
    subCat1,
    setSubCat1,
    setCategoria,
  } = useProductQuerys(router);
  const { secciones, sectionError } = useGetSections(categoria);
  const {
    queryArr,
    priceMinMax,
    setPriceMinMax,
    setProductOrder,
    productOrder,
  } = useQueryArray(searchInputValue, categoria, subCat1);
  const { products, setProducts, marcas, setMarcas, loadedProducts } =
    useGetProducts(categoria, searchInputValue, queryArr);
  const { page, pagesTotal, setPlusPage, setMinusPage, handlePagination } =
    useHandlePagination(filterProducts(products));

  const FormatProductTitle = categoria
    ? `${categoria} ${subCat1 ? ` - ${subCat1}` : ""}`
    : "Productos";

  const productTopCompTitle = categoria
    ? `${categoria} ${subCat1 ? ` > ${subCat1}` : ""}`
    : "Productos";

  return (
    <FormatProduct
      loader={loadedProducts}
      cartIndex={cartList.length}
      title={FormatProductTitle}
      setDescuentoValue={setDescuento}
      marcasPropPick={setMarcasPick}
      filtersClean={filtersClean}
      marcasProp={marcas}
      setPriceRange={setPriceMinMax}
    >
      <ProductTopComp
        searchInputProp={searchInputValue.join(" ")}
        title={productTopCompTitle}
        searchInputClean={cleanInput}
        setProduct={setProductOrder}
        catProp={categoria}
        sections={secciones}
        category={categoria}
        setSubCat1={setSubCat1}
        setProductOrder={setProductOrder}
        subCat1={subCat1}
      />

      <Box
        mt={[2, 4, 7, 10]}
        minH="30vh"
        m={2}
        border="1px solid #a7a7a7"
        borderRadius="15px"
      >
        <Flex justify="center" flexDir="column" p={2} m={2}>
          {!categoria && searchInputValue.length === 0 && <BusquedaGeneral />}
          {!loadedProducts && (categoria || searchInputValue.length > 0) ? (
            <Flex mt={10} justify="center">
              <BeatLoader color="#68EBBB" />
            </Flex>
          ) : (
            filterProducts(products).map((product, i) => {
              if (i > page * 10 - 11 && i < page * 10)
                return (
                  <ProductStructure
                    page={page}
                    i={i}
                    id={product.id}
                    nombre={product.Nombre}
                    precio={product.Precio}
                    descuento={product.Descuento}
                    img={product.Img[0]}
                    favoriteList={favoriteList}
                    cartList={cartList}
                    onClickCarrito={() =>
                      setCartList([...cartList, product.id])
                    }
                    onClickFavorito={() => handleFavorito(product.id, i)}
                    key={product.id}
                    isSpinner={showSpinner && selectedProd === i}
                  />
                );
            })
          )}
        </Flex>
        {loadedProducts && (
          <Flex justify="center" bg="white" h="10vh">
            {products.length
              ? pagesTotal > 1 && (
                  <ProductsPagination
                    pagina={page}
                    paginasTotales={pagesTotal}
                    manejarPaginacion={handlePagination}
                    handleSiguiente={setPlusPage}
                    handleAnterior={setMinusPage}
                  />
                )
              : searchInputValue.length > 0 && (
                  <Flex flexDir="column">
                    <Text>
                      No se encontraron resultados
                      {categoria && ` buscando en "${categoria}"`}
                    </Text>
                    {categoria && (
                      <Text
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => setCategoria()}
                      >
                        Buscar "{searchInputValue.join(" ")}" en general
                      </Text>
                    )}
                  </Flex>
                )}
          </Flex>
        )}
      </Box>
    </FormatProduct>
  );
};

export default productos;
