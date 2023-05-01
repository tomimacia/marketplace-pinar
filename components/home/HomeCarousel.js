import { Flex, chakra, shouldForwardProp, useBreakpointValue } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { HomeProduct } from "./HomeProduct";
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const HomeCarousel = ({ products }) => {
  const boxWidth = useBreakpointValue({xs:175,sm:200,md:225,lg:225,xl:225})
  return (
    <ChakraBox     
      key={boxWidth}
      initial={{ x: "100vw" }}
      animate={{ x: `-${boxWidth*products.length+50*(products.length-1)}px` }}
      transition={{
        x: {
          duration: boxWidth/6,
          repeat: Infinity,
          ease: "linear",
        },        
      }}
    >
      <Flex gap={"50px"}>
        {products.map((product) => {
          return <HomeProduct product={product} key={product.id+"HomeProduct"} />;
        })}
      </Flex>
    </ChakraBox>
  );
};
