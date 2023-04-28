import { Flex, chakra, shouldForwardProp } from "@chakra-ui/react";
import React from "react";
import { HomeProduct } from "./HomeProduct";
import { isValidMotionProp, motion } from "framer-motion";
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const HomeCarousel = ({ products }) => {
  return (
    <Flex w="100%" justify="space-between">
      {products.map((product, i) => {
        const intial = ((products.length+1)*100)
        return (
          <ChakraBox
            initial={{ x: `${intial}%` }}
            animate={{ x: `-${intial}%` }}
            transition={{
              x: {
                delay: i/2,
                duration: products.length*2,
                repeat: Infinity,
                ease: "linear",
              },
              repeat: Infinity,
            }}
          >
            <HomeProduct product={product} i={i} />
          </ChakraBox>
        );
      })}
    </Flex>
  );
};
