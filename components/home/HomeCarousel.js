import { Flex, chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { HomeProduct } from "./HomeProduct";
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const HomeCarousel = ({ products }) => {  
  return (
    <ChakraBox      
      dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
      initial={{ x: "100vw" }}
      animate={{ x: "calc(-100% - 275px)" }}
      transition={{
        x: {
          duration: products.length * 5,
          repeat: Infinity,
          ease: "linear",
        },
        repeat: Infinity,
      }}
    >
      <Flex gap={"50px"}>
        {products.map((product, i) => {
          return <HomeProduct product={product} i={i} />;
        })}
      </Flex>
    </ChakraBox>
  );
};
