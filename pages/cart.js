import { Box, Flex, Heading } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import FormatBlank from "../components/FormatBlank";
import { CartProducts } from "../components/cart/cartProducts";
import { EmptyCart } from "../components/cart/empyCart";
import { useCartList } from "../items/customHooks/useCartList";
import { useGetCart } from "../items/customHooks/useGetCart";

const Carrito = () => {
  const { cartList, actions, quantityTotal } = useCartList();
  const { loading, products, error } = useGetCart(cartList);

  return (
    <FormatBlank size="lg" cartIndex={cartList.length} title="Carrito">
      <Flex minH="60vh">
        <Flex flexGrow={1}></Flex>
        <Flex
          flexGrow={10}
          border="2px solid black"
          flexDir="column"
          bg="gray.200"
          p={3}
          borderRadius="10px"
        >
          <Box p={[2, 3, 4, 5]} borderBottom="1px solid black">
            <Heading size={["md", "md", "xl", "xl"]}>Tus productos</Heading>
          </Box>
          {loading && (
            <Flex mt={10} justify="center">
              <BeatLoader color="#68EBBB" />
            </Flex>
          )}
          {!loading &&
            (cartList.length > 0 ? (
              <CartProducts
                products={products}
                actions={actions}
                quantityTotal={quantityTotal}
                cartList={cartList}
              />
            ) : (
              <EmptyCart />
            ))}          
        </Flex>
        <Flex flexGrow={1}></Flex>
      </Flex>
    </FormatBlank>
  );
};

export default Carrito;
