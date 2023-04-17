import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ProductTopChildren } from "./productTopChildren";


const ProductTopComp = ({
  title,
  searchInputProp,
  searchInputClean,
  category,
  sections,
  setSubCat1,
  subCat1,
  setProductOrder,  
}) => {
  return (
    <Flex flexDir='column'>      
        <ProductTopChildren
        category={category}
        sections={sections}
        setSubCat1={setSubCat1}
        subCat1={subCat1}
        setProductOrder={setProductOrder}
        />      
      <Box pt={2} pr={[1, 3, 5, 7]} pl={[1, 3, 5, 7]}>
        <Box p={1} borderBottom="1px solid black">
          <Heading
            as={motion.h1}
            initial={{ x: "120vw" }}
            animate={{ x: 0 }}
            size={["xs", "xs", "sm", "sm"]}
          >
            {title}
          </Heading>
        </Box>
        <Flex flexDir={["column", "column", "row", "row"]}>          
          {searchInputProp && (
            <Flex
              mt={2}
              maxW={["100%", "100%", "50%", "50%"]}
              flexGrow={1}
              justifyContent="space-between"
            >
              <Text align="center">{`Resultados para: "${searchInputProp}"`}</Text>
              <IconButton
                onClick={searchInputClean}
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
