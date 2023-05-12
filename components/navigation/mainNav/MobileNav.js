import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  chakra,
  shouldForwardProp,
  useColorModeValue,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import NavItem from "../../../items/navItem";

const links = [
  ["Home", "/"],
  ["Productos", "/productInterface"],
  ["Nosotros", "/about"],
  ["Contacto", "/contact"],
  ["Carrito", "/cart"],
];
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
export const MobileNav = ({ changeDisplay }) => {
  return (
    <ChakraBox
      initial={{ opacity: 0, x: "-100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100vw" }}
      transition={{ type: "tween" }}
      w="100vw"
      bgColor="transparent"
      zIndex={20}
      height="100vh"
      pos="fixed"
      top="0"
      left="0"
      overflowY="auto"
      flexDir="column"
    >
      <Flex>
        <Box bg={useColorModeValue("white", "gray.700")} w="90%">
          <Flex justify="flex-end">
            <IconButton
              onClick={changeDisplay}
              m={1}              
              aria-label="Close Menu"
              size="lg"
              icon={<CloseIcon />}
              color={useColorModeValue("blackAlpha.700", "white")}
            />
          </Flex>
          <Flex gap={6} flexDir="column" align="center">
            {links.map((link) => {
              return (
                <Button
                  onClick={changeDisplay}
                  key={link[0]}
                  w="100%"
                  borderRadius={0}
                  bg="blue.500"
                  color={useColorModeValue("white", "gray.300")}
                >
                  <NavItem href={link[1]}>{link[0]}</NavItem>
                </Button>
              );
            })}
          </Flex>
        </Box>
        <Box w="10%" h="100vh" bg="blackAlpha.300" />
      </Flex>
    </ChakraBox>
  );
};
