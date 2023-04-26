import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  useCategoria,
  useSearchInputValue,
  useSetSearchInputValue,
  useSubCat1,
} from "../../contexts/productsContext";
import { ProductTopChildren } from "./ProductTopChildren";
import { useRouter } from "next/router";

const ProductTopComp = () => {
  const router = useRouter();
  const categoria = useCategoria();
  const subCat1 = useSubCat1();
  const searchInputValue = useSearchInputValue();
  const setSearchInputValue = useSetSearchInputValue();
  const crossClick = () => {
    setSearchInputValue([]);
    if (!categoria) router.push("/productPages/busquedaProducts");
  };
  return (
    <Flex flexDir="column">
      <ProductTopChildren />
      <Box pt={2} pr={[1, 3, 5, 7]} pl={[1, 3, 5, 7]}>
        <Box p={1} borderBottom="1px solid black">
          <Heading
            as={motion.h1}
            initial={{ x: "120vw" }}
            animate={{ x: 0 }}
            size={["xs", "xs", "sm", "sm"]}
          >
            {categoria
              ? `${categoria} ${subCat1 ? ` > ${subCat1}` : ""}`
              : "Productos"}
          </Heading>
        </Box>
        <Flex flexDir={["column", "column", "row", "row"]}>
          {searchInputValue.length > 0 && (
            <Flex
              mt={2}
              maxW={["100%", "100%", "50%", "50%"]}
              flexGrow={1}
              justifyContent="space-between"
            >
              <Text align="center">{`Resultados para: "${searchInputValue.join(
                " "
              )}"`}</Text>
              <IconButton
                onClick={crossClick}
                size="xs"
                icon={<CloseIcon />}
                color="blackAlpha.700"
                mr={5}
              />
            </Flex>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductTopComp;
