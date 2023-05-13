import { Box, Flex, Heading } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import FormatBlank from "../components/FormatBlank";
import { CartProducts } from "../components/cart/CartProducts";
import { EmptyCart } from "../components/cart/EmpyCart";
import { useCartList } from "../items/customHooks/cartHooks/useCartList";
import { useGetCart } from "../items/customHooks/cartHooks/useGetCart";

const Cart = () => {
  const { cartList, actions, quantityTotal } = useCartList();
  const { loading, products, error } = useGetCart(cartList);

  return (
    <FormatBlank size="lg" pageTitle="Carrito" headTitle="Carrito">
      <Flex minH="60vh">
        <Flex flexGrow={1}></Flex>
        <Flex
          flexGrow={10}
          border="2px solid black"
          flexDir="column"          
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

export default Cart;
