import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { FilterDiscounts } from "./filterBarItems/filterDiscounts";
import { FilterMarcas } from "./filterBarItems/filterMarcas";
import { FilterMinMax } from "./filterBarItems/filterMinMax";
import {
  usePriceMinMax,
  useResetFilters,
  useSetDescuento,
  useSetMarcasPicked,
} from "../../../contexts/productsContext";
export const FilterSideBar = ({ loader }) => {
  const matches = useMediaQuery("(min-width: 780px)");
  const [show, setShow] = useState(false);
  const [prepareMarcas, setPrepareMarcas] = useState([]);
  const resetFilters = useResetFilters();
  const priceMinMax = usePriceMinMax();
  const setDescuento = useSetDescuento();
  const setMarcasPicked = useSetMarcasPicked();
  const variants = {
    open: {
      minW: "60vw",
      transitionDuration: "0.7s",
    },
    close: {
      w: "10vw",
      transitionDuration: "0.7s",
    },
    rotated: {
      rotate: 90,
      color: "#2961EE",
      marginLeft: "150px",
    },
    openNav: {
      display: "flex",
      opacity: 1,
      transitionDuration: "0.1s",
    },
    closeNav: {
      transitionDuration: "0.1s",
      display: "none",
      opacity: 0,
    },
  };
  useEffect(() => {
    if (matches && loader)
      setTimeout(() => {
        setShow(true);
      }, 500);
  }, [loader]);
  const handleClick = () => {
    setShow(!show);
  };
  const onClickCleanValues = () => {
    // removeDcRefs() => pass this to filterDiscount
    // sliderThumbRef.current.style.left = "calc(0% - 6.99219px)";
    // filledTrackRef.current.style.width = "0%";
    setPrepareMarcas([]);
    if (priceMinMax.min > 0 && priceMinMax.max < Infinity) resetFilters();
    else {
      setDescuento(0);
      setMarcasPicked([]);
    }
  };

  return (
    <Flex
      as={motion.nav}
      maxW="100vw"
      variants={variants}
      animate={show ? "open" : "close"}
      position="sticky"
      zIndex={10}
      top={0}
      bg={show ? "blackAlpha.300" : "blue.500"}
      flexDir="column"
      minH={'100%'}
      flexGrow={1}
      borderRadius="10px"
    >
      <Flex flexGrow={5} flexDir="column">
        <Flex
          _hover={[
            { bg: "none" },
            { bg: "none" },
            { bg: "none" },
            { bg: "blue.300", borderRadius: "5px" },
          ]}
          align="center"
          h="60px"
          cursor="pointer"
          maxW="200px"
          onClick={handleClick}
          borderBottom="1px solid #7D7D7D"
          bg="blue.400"
        >
          <Flex w="100%" align="center">
            <Text
              as={motion.h2}
              animate={show ? "open" : "closed"}
              display={show ? "flex" : "none"}
              w="100%"
              fontSize="20px"
              fontWeight="medium"
            >
              Filtrar por
            </Text>
            <Flex w="20%" m="auto" justify={show ? "flex-end" : "center"}>
              <Box
                as={motion.div}
                variants={variants}
                animate={show ? "rotated" : "none"}
              >
                <HamburgerIcon fontSize={20} />
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          as={motion.div}
          variants={variants}
          animate={show ? "openNav" : "closeNav"}
          flexDir="column"
        >
          <FilterMinMax />
          <FilterMarcas
            prepareMarcas={prepareMarcas}
            setPrepareMarcas={setPrepareMarcas}
          />
          <FilterDiscounts />
          <Button
            boxShadow="0 1px 5px"
            mt={5}
            placeSelf='center'
            size="xs"
            bg="gray.300"
            w="70%"
            onClick={onClickCleanValues}
          >
            Limpiar filtros
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
