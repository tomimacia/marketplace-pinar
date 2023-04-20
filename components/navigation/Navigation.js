import {
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  Search2Icon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { a, b } from "../../chakra/bgColors";
import { useOnKeyPress } from "../../items/customHooks/useOnKey";
import NavItem from "../../items/navItem";
import { ClientNavigation } from "./ClientNavigation";

import { ProductsNav } from "./ProductsNav";
import { MobileNav } from "./mainNav/mobileNav";

const pages = [
  ["Home", "/"],
  ["Productos", "/productPages/busquedaProducts"],
  ["Nosotros", "/about"],
  ["Contacto", "/contact"],
];

const Navigation = () => {
  const searchInputNav = useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [cartCount, setCartCount] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const [display, changeDisplay] = useState("none");
  const [searchInputValue, setSearchInputvalue] = useState("");


  const handleEnter = () => {
    if (document.activeElement === searchInputNav.current) {
      if (searchInputValue.length <= 1 || searchInputValue.length > 50)
        toast({
          title: `Ingresa una busqueda entre 2 y 50 caracteres`,
          status: "error",
          isClosable: true,
        });
      else {
        router.push(
          `/productPages/productInterface?searchInput=${searchInputValue.toLocaleLowerCase()}`
        );
      }
    }
  };
  const handleSearchClick = () => {
    if (searchInputValue.length <= 1 || searchInputValue.length > 50)
      toast({
        title: `Ingresa una busqueda entre 2 y 50 caracteres`,
        status: "error",
        isClosable: true,
      });
    else {
      router.push(
        `/productPages/productInterface?searchInput=${searchInputValue.toLocaleLowerCase()}`
      );
    }
  };

  return (
    <Box bgGradient={useColorModeValue(a, b)} p={1}>
      <Flex width="100%" height={50} alignItems="center">
        <Breadcrumb
          flexGrow={1}
          spacing={3}
          display={["none", "none", "none", "flex"]}
        >
          {pages.map((page) => {
            return (
              <BreadcrumbItem key={page[0]}>
                <NavItem href={`${page[1]}`}>{page[0]}</NavItem>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>

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
                onKeyDown={useOnKeyPress("Enter", handleEnter)}
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
                onClick={handleSearchClick}
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
              fontSize={20}
              mt={1}
              boxSize={33}
              _hover={{ color: "blackAlpha.400" }}
              bg="transparent"
              ml={2}
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
                <Box
                  as={motion.span}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  right={1}
                  minW={4}
                  h={5}
                  display={cartCount === 0 && "none"}
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
                  <Text>{cartCount}</Text>
                </Box>
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
