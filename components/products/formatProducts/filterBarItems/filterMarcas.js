import { Checkbox, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import {
  useMarcas,
  useSetMarcasPicked
} from "../../../../contexts/productsContext";
import { ProductSideBarItem } from "./productSideBarItem";

export const FilterMarcas = ({ prepareMarcas, setPrepareMarcas }) => {
  const marcas = useMarcas();
  const setMarcasPicked = useSetMarcasPicked();
  const handleCheckbox = (e) => {
    if (prepareMarcas.includes(e.target.value)) {
      let newArr = prepareMarcas.filter((m) => m !== e.target.value);
      setPrepareMarcas([...newArr]);
    } else {
      setPrepareMarcas((prev) => [...prev, e.target.value]);
    }
  };
  function orderSort(a, b) {
    return a < b ? -1 : 1;
  }
  const applyChanges = () => {
    setMarcasPicked(prepareMarcas);
  };
  return (
    Object.values(marcas).length > 0 && (
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
                        isChecked={prepareMarcas.includes(mrk)}
                      >
                        {`${mrk} (${marcas[mrk]})`}
                      </Checkbox>
                    </ListItem>
                  );
              })}
          </UnorderedList>
        </Flex>
      </ProductSideBarItem>
    )
  );
};
