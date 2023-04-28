import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";
import { useCategoria, useSubCat1 } from "../../contexts/productsContext";
import Layout from "../Layout";
import { FilterSideBar } from "./formatProducts/filterSideBar";
export const FormatProduct = ({ loader, children }) => {
  const categoria = useCategoria();
  const subCat1 = useSubCat1();

  const FormatProductTitle = useMemo(() => {
    categoria ? `${categoria} ${subCat1 ? ` - ${subCat1}` : ""}` : "Productos";
  }, [categoria, subCat1]);

  return (
    <Layout headTitle={categoria || "Productos"} pageTitle={FormatProductTitle}>
      <Flex
        align="center"
        justify="center"
        h={["45px", "45px", "55px", "55px"]}
        boxShadow="0 10px 20px"
        bg={useColorModeValue("teal.400","teal.700")}
      >
        <Heading>Publicidad</Heading>
      </Flex>
      <Flex gap={[1, 2, 2, 2]}>
        <Flex
          minW={["28px", "32px", "35px", "35px"]}
          maxW={["28px", "32px", "35px", "100%"]}
        >
          <FilterSideBar loader={loader} />
        </Flex>
        <Flex flexGrow={10}>
          <Flex
            borderRadius="10px"
            flexGrow={1}
            flexDir="column"
            minH="80%"
            h="100%"
            bg={useColorModeValue("white","gray.600")}
          >
            {children}
          </Flex>
        </Flex>
        <Flex flexGrow={1} bg={useColorModeValue("teal.400","teal.700")} boxShadow="10px 10px 20px" />
      </Flex>
    </Layout>
  );
};
