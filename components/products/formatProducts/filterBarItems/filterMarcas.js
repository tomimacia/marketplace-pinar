import { Checkbox, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import {
  useMarcas,
  useMarcasPicked,
  useSetMarcasPicked,
} from "../../../../contexts/productsContext";
import { ProductSideBarItem } from "./productSideBarItem";

export const FilterMarcas = () => {
  const marcas = useMarcas();
  const marcasPicked = useMarcasPicked();
  const setMarcasPicked = useSetMarcasPicked();
  const handleCheckbox = (e) => {
    if (marcasPicked.includes(e.target.value)) {
      let newArr = marcasPicked.filter((m) => m !== e.target.value);
      setMarcasPicked([...newArr]);
    } else {
      setMarcasPicked([...marcasPicked, e.target.value]);
    }
  };
  function orderSort(a, b) {
    return a < b ? -1 : 1;
  }
  const applyChanges = () => {
    setMarcasPicked(marcasPicked);
  };
  return (
    marcas && (
      <ProductSideBarItem applyChanges={applyChanges} title="Marcas">
        <Flex w="100%" flexDir="column">
          <UnorderedList listStyleType="none">
            {Object.keys(marcas)
              .sort(orderSort)
              .map((mrk) => {
                if (mrk)
                  return (
                    <ListItem key={mrk}>
                      <Checkbox
                        onChange={handleCheckbox}
                        value={mrk}
                        border="1px gray"
                        isChecked={marcasPicked.includes(mrk)}
                      >
                        {`${mrk} (${marcas[mrk]})`}
                      </Checkbox>
                    </ListItem>
                  );
              })}
          </UnorderedList>
          {/* onClick={() => marcasPropPick(marcasPicked)} */}
        </Flex>
      </ProductSideBarItem>
    )
  );
};
