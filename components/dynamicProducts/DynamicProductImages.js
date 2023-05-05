import { Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";

export const DynamicProductImages = ({ images }) => {
  const [mainImg, setMainImg] = useState(0);
  const [tempImg, setTempImg] = useState(0);
  const [imgDisplay, setImgDisplay] = useState(true);
  const handleMouseOver = (img) => {
    setTempImg(img);
    setImgDisplay(false);
  };
  return (
    <Flex flexDir="row">
      <Flex flexDir="column">
        {images.map((img, i) => {
          return (
            <Flex
              key={i}
              onClick={() => setMainImg(i)}
              onMouseOver={() => handleMouseOver(i)}
              onMouseOut={() => setImgDisplay(true)}
              cursor="pointer"
              justifyContent="center"
              h="50px"
              w="50px"
              _hover={{ border: "2px solid blue" }}
            >
              <Image
                objectFit="cover"
                mb={1}
                minH="50px"
                w="40px"
                minW="40px"
                h="50px"
                src={img}
              />

              <Flex
                w="3px"
                ml={1}
                minW="3px"
                minH="50px"
                borderRadius={5}
                bg={i === mainImg ? "blue.500" : "none"}
              ></Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex bg="gray.200" mr={5} justify="center">
        <Image
          pr={1}
          pl={2}
          objectFit="cover"          
          minH="400px"
          h="400px"
          src={images[imgDisplay ? mainImg : tempImg]}
        />
      </Flex>
    </Flex>
  );
};
