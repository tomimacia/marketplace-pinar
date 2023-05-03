import {
  HamburgerIcon,
  MoonIcon,
  Search2Icon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { a, b } from "../../chakra/bgColors";
import { ClientNavigation } from "./ClientNavigation";

import { useCartContext } from "../../contexts/ShoppingCartContext";
import { useReset } from "../../contexts/productsContext";
import { useEnter } from "../../items/customHooks/eventHooks/useEnter";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import { NavigationLinks } from "./NavigationLinks";
import { ProductsNav } from "./ProductsNav";
import { MobileNav } from "./mainNav/MobileNav";

const Navigation = () => {
  const searchInputNav = useRef(null);
  const reset = useReset()  
  const router = useRouter();
  const { errorToast } = useCustomToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const [display, changeDisplay] = useState("none");
  const [searchInputValue, setSearchInputvalue] = useState("");
  const cartContext = useCartContext();
  const setSearch = () => {
    if (searchInputValue.length <= 1 || searchInputValue.length > 50)
      errorToast("Ingresa una busqueda entre 2 y 50 caracteres");
    else {
      reset()
      router.push(`/productPages/productInterface?SearchInputValue=${searchInputValue}`);
    }
  };  

  return (
    <Box bgGradient={useColorModeValue(a, b)} p={1}>
      <Flex width="100%" height={50} alignItems="center">
        <NavigationLinks />

        <Flex flexGrow={1}>
          <Flex flexGrow={5}>
            <IconButton
              display={["none", "flex", "flex", "none"]}
              icon={<HamburgerIcon />}
              aria-label="Open Menu"
              onClick={() => changeDisplay("flex")}
              mr={2}
            />
            <Flex flexGrow={1} justify="right">
              <Input
                variant="Flushed"
                width={["130px", "auto", "auto", "auto"]}
                minW="10px"
                flexGrow={1}
                ref={searchInputNav}
                maxW={600}
                onKeyDown={useEnter(searchInputNav.current, setSearch)}
                placeholder="Search products"
                onChange={(e) => setSearchInputvalue(e.target.value)}
                bg={useColorModeValue("white", "gray.500")}
                color={useColorModeValue("blackAlpha.600", "white")}
              />
              <Search2Icon
                cursor="pointer"
                fontSize={20}
                justify="right"
                display={["none", "flex", "flex", "flex"]}
                borderRadius="10%"
                onClick={setSearch}
                _hover={{ color: "blackAlpha.400" }}
                m={2}
              />
            </Flex>
          </Flex>
          <Flex justify="right">
            <IconButton
              icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              outlineColor={useColorModeValue("blackAlpha.400", "gray.400")}
              cursor="pointer"
              fontSize={18}
              mt={1}
              size="sm"
              _hover={{ color: "blackAlpha.400" }}
              bg="transparent"
              mr="45px"
            >
              Switch Mode
            </IconButton>
            <Link href="/cart">
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
        </Flex>
      </Flex>

      <Flex mt={2}>
        <Flex display={["none", "flex", "flex", "flex"]} flexGrow={1}>
          <ProductsNav />
        </Flex>
        <Flex>
          <IconButton
            display={["flex", "none", "none", "none"]}
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={() => changeDisplay("flex")}
            mr={2}
            justify="left"
            size="sm"
          />
        </Flex>
        <Flex flexGrow={1} justify="right">
          <ClientNavigation />
        </Flex>
      </Flex>
      <Flex>
        <Flex mt={2} display={["flex", "none", "none", "none"]} flexGrow={1}>
          <ProductsNav />
        </Flex>
      </Flex>

      <MobileNav
        display={display}
        changeDisplay={() => changeDisplay("none")}
      />
    </Box>
  );
};

export default Navigation;
