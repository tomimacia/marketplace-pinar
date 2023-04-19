import { Flex, Select, Text } from "@chakra-ui/react";
import { useCategoria, useSetSubCat1, useSubCat1 } from "../../contexts/productsContext";
import { useGetSections } from "../../items/customHooks/productsInterfaceHooks/useGetSections";

export const ProductTopChildren = () => {
  const { sections, sectionError } = useGetSections();
  const categoria = useCategoria()
  const subCat1 = useSubCat1();
  const setSubCat1 = useSetSubCat1();
  return (
    <>
      <Flex
        flexDir={["column", "column", "column", "row"]}
        justifyContent="space-between"
        flexGrow={1}
      >
        <Flex w={["100%", "100%", "100%", "30%"]}>
          {categoria && (
            <Select
              size={["xs", "sm"]}
              placeholder="Secciones"
              borderBottom="1px solid #7D7D7D"
              borderRight="1px solid #7D7D7D"
              value={subCat1}
              onChange={(e) => {
                setSubCat1(e.target.value);
              }}
            >
              {sections &&
                sections.map((sec) => {
                  return (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  );
                })}
            </Select>
          )}
        </Flex>
        <Flex w={["100%", "100%", "100%", "50%"]}>
          <Text
            w={["45%", "45%"]}
            m="auto 1%"
            fontSize={["xs", "xs", "sm", "md"]}
          >
            Ordenar por
          </Text>
          <Select
            name="ordernarPor"
            borderBottom="1px solid #7D7D7D"
            borderLeft="1px solid #7D7D7D"
            placeholder="Mejores resultados"
            size={["xs", "sm"]}
            onChange={(e) => {
              setProductOrder(e.target.value);
            }}
          >
            <option value="desc">Mayor Precio</option>
            <option value="asc">Menor Precio</option>
          </Select>
        </Flex>
      </Flex>
      {subCat1 && (
        <Text
          textDecor="underline"
          ml={1}
          _hover={{ color: "blue.600" }}
          cursor="pointer"
          onClick={() => setSubCat1()}
        >{`Buscar en "${categoria}"`}</Text>
      )}
    </>
  );
};
