import { Search2Icon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Progress,
  UnorderedList,
  useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  useSetCategoria,
  useSetSearchInputValue,
  useSetSubCat1
} from "../../contexts/productsContext";
import { useCategories } from "../../items/customHooks/useCategories";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import { useEnter } from "../../items/customHooks/useEnter";

export const BusquedaGeneral = () => {
  const searchInputNav2 = useRef(null);  
  
  const setSubCat1 = useSetSubCat1();
  const setCategory = useSetCategoria();
  const setSearchInputProp = useSetSearchInputValue();
  const [searchInputValue, setSearchInputValue] = useState("");
  const {errorToast} = useCustomToast()
  const { categories, loadingCategories, categoriesError } = useCategories();

  const setSearch = () => {
    if (searchInputValue.length <= 1 || searchInputValue.length > 50)
    errorToast("Ingresa una busqueda entre 2 y 50 caracteres");
    else {
      setSearchInputProp(searchInputValue.split(" "));      
    }
  };
  const onClickFunction = (cat, subCat) => {
    setCategory(cat);
    if (subCat) setSubCat1(subCat);
  };  
  return (
    <Flex
      as={motion.div}
      display="flex"
      flexDir="column"
      transitionDuration={"0.5s"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      minH="60vh"
    >
      <Heading fontFamily="arial" as="h3" size={["sm", "sm", "md", "md"]}>
        Ingresa tu busqueda para comenzar!
      </Heading>
      <InputGroup>
        <Input
          mt={3}
          placeholder="¿Que estas buscando?"
          borderColor="blackAlpha.300"
          type="text"
          autoComplete="on"
          ref={searchInputNav2}
          onKeyDown={useEnter(searchInputNav2.current, setSearch)}
          onChange={(e) => setSearchInputValue(e.target.value)}
          bg={useColorModeValue("white", "gray.500")}
          color={useColorModeValue("blackAlpha.600", "white")}
        />
        <InputRightElement size="lg">
          <Search2Icon mt={5} cursor="pointer" onClick={setSearch} />
        </InputRightElement>
      </InputGroup>
      <Flex mt={10} flexDir="column">
        <Heading
          borderBottom="1px solid #c7c7c7"
          pb={2}
          as="h3"
          size={["xs", "xs", "sm", "sm"]}
        >
          o selecciona una categoria
        </Heading>
        <Flex mt={4}>
          {loadingCategories && (
            <Flex>
              <Progress m="22px" size="xs" isIndeterminate />
            </Flex>
          )}
          {!loadingCategories && (
            <Accordion ml="2%" minW="90%" allowToggle>
              {categories.map((cat) => {
                return (
                  <AccordionItem key={cat.id}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {cat.id}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Heading
                        mb={2}
                        _hover={{ color: "blackAlpha.700" }}
                        cursor="pointer"
                        fontWeight="light"
                        fontSize={14}
                        onClick={() => onClickFunction(cat.id)}
                      >
                        {`Buscar en ${cat.id}`}
                      </Heading>
                      <UnorderedList>
                        {cat.SubCat1.map((thisSubCat) => {
                          return (
                            <ListItem
                              key={thisSubCat}
                              _hover={{ color: "blackAlpha.700" }}
                              cursor="pointer"
                              onClick={() =>
                                onClickFunction(cat.id, thisSubCat)
                              }
                            >
                              {thisSubCat}
                            </ListItem>
                          );
                        })}
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
