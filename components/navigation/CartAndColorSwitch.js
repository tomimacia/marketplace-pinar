import { Box, Flex, Text } from "@chakra-ui/react";
import { ColorModeSwitch } from "./ColorModeSwitch";
import Link from "next/link";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartContext } from "../../contexts/ShoppingCartContext";

export const CartAndColorSwitch = () => {
    const cartContext = useCartContext();
  return (
    <Flex justify="right">
      <ColorModeSwitch />
      <Link href="/Cart">
        <Flex>
          <Icon
            as={AiOutlineShoppingCart}
            cursor="pointer"
            _hover={{ color: "blackAlpha.400" }}
            fontSize={34}
            position="fixed"
            top="10px"
            right="4px"
            bg="whiteAlpha.400"
            borderRadius="50px"
            zIndex={13}
          />
          {cartContext > 0 && (
            <Box
              right={1}
              minW={4}
              h={5}
              cursor="pointer"
              lineHeight="18px"
              textAlign="center"
              pos="fixed"
              bg="red"
              borderRadius="50%"
              fontWeight="Bold"
              fontSize={15}
              zIndex={14}
            >
              <Text>{cartContext}</Text>
            </Box>
          )}
        </Flex>
      </Link>
    </Flex>
  );
};
