import { Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useSetPriceMinMax } from "../../../../contexts/productsContext";
import { useEnter } from "../../../../items/customHooks/eventHooks/useEnter";
import { ProductSideBarItem } from "./productSideBarItem";

export const FilterMinMax = () => {
  const setPriceMinMax = useSetPriceMinMax();
  const [maxMin, setMaxMin] = useState({ min: 0, max: Infinity });
  const searchInputNavMin = useRef(null);
  const searchInputNavMax = useRef(null);

  const applyRangeChanges = () => {
    if (maxMin.min > 1 || maxMin.max < Infinity) setPriceMinMax(maxMin);
  };
  return (
    <ProductSideBarItem applyChanges={applyRangeChanges} title="Precio">
      <Flex width="100%" flexDir="column">
        <Flex flexDir="column">
          <Flex flexDir="column">
            <Text>Precio Min</Text>
            <Input
              onChange={(e) => {
                if (e.target.value) {
                  setMaxMin({
                    ...maxMin,
                    min: parseInt(e.target.value),
                  });
                } else {
                  setMaxMin({
                    ...maxMin,
                    min: 0,
                  });
                }
              }}
              borderColor="blackAlpha.500"
              ref={searchInputNavMin}
              onKeyDown={useEnter(searchInputNavMin.current, applyRangeChanges)}
              bg={useColorModeValue('white',"gray.400")}
              color="black"
              w="80%"
              size="xs"
              type="number"
              placeholder={"Ingresa un mínimo"}              
            />
          </Flex>
          <Flex flexDir="column">
            <Text>Precio Max</Text>
            <Input
              onChange={(e) => {
                if (e.target.value) {
                  setMaxMin({
                    ...maxMin,
                    max: parseInt(e.target.value),
                  });
                } else {
                  setMaxMin({
                    ...maxMin,
                    max: Infinity,
                  });27000
                }
              }}
              borderColor="blackAlpha.500"
              ref={searchInputNavMax}
              onKeyDown={useEnter(searchInputNavMax.current, applyRangeChanges)}
              bg={useColorModeValue('white',"gray.400")}
              color="black"
              w="80%"
              size="xs"
              type="number"
              placeholder={"Ingresa un máximo"}
            />
          </Flex>
        </Flex>
        {/* onClick={() => applyRangeChanges()} */}
      </Flex>
    </ProductSideBarItem>
  );
};
