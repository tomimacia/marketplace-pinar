import { Search2Icon } from "@chakra-ui/icons";
import { Flex, Input, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useReset } from "../../contexts/productsContext";
import { useRef, useState } from "react";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import { useEnter } from "../../items/customHooks/eventHooks/useEnter";

export const SearchInputAndIcon = () => {
  const searchInputNav = useRef(null);
  const reset = useReset();
  const router = useRouter();
  const { errorToast } = useCustomToast();
  const [searchInputValue, setSearchInputvalue] = useState("");
  const setSearch = () => {
    if (searchInputValue.length <= 1 || searchInputValue.length > 50)
      errorToast("Ingresa una busqueda entre 2 y 50 caracteres");
    else {
      reset();
      router.push(
        `/ProductInterface?SearchInputValue=${searchInputValue}`
      );
    }
  };
  return (
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
  );
};
