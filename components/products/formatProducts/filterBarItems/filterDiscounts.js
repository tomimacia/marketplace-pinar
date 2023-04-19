import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ProductSideBarItem } from "./productSideBarItem";
import { useSetDescuento } from "../../../../contexts/productsContext";

export const FilterDiscounts = () => {
  const setDescuento = useSetDescuento();
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "xs",
  };
  const [sliderValue, setSliderValue] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  const sliderValueRef = useRef(null);
  const sliderThumbRef = useRef(null);
  const filledTrackRef = useRef(null);
  const applyChanges = () => {
    if (sliderValue > 0) setDescuento(sliderValue);
  };
  return (
    <ProductSideBarItem applyChanges={applyChanges} title="Descuentos">
      <Flex width="100%" flexDir="column">
        <Flex w="85%">
          <Slider
            focusThumbOnChange
            defaultValue={0}
            aria-label="slider-ex-6"
            ref={sliderValueRef}
            onChange={(val) => setSliderValue(val)}
            min={0}
            max={30}
            onTouchStart={() => setShowSlider(true)}
            onTouchEnd={() => setShowSlider(false)}
          >
            <SliderMark value={10} {...labelStyles}>
              10%
            </SliderMark>
            <SliderMark value={20} {...labelStyles}>
              20%
            </SliderMark>
            <SliderMark value={32} {...labelStyles}>
              |
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack ref={filledTrackRef} />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.400"
              color="white"
              placement="top"
              isOpen={showSlider}
              label={`${sliderValue}%`}
            >
              <SliderThumb
                ref={sliderThumbRef}
                bg="gray.300"
                _hover={{ bg: "blue.300" }}
                onMouseEnter={() => setShowSlider(true)}
                onMouseLeave={() => setShowSlider(false)}
              />
            </Tooltip>
          </Slider>
        </Flex>
      </Flex>
    </ProductSideBarItem>
  );
};
