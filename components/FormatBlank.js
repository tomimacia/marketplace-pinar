import Layout from "./Layout";
import { Flex, Heading, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const FormatBlank = ({  
  children,
  size,
  headTitle,
  pageTitle
}) => {
  return (
    <Layout      
      headTitle={headTitle}                           
    >
      <Box minH="80vh" h="100%" bgGradient="linear(to-b, gray.200, gray.100)">
        <Flex          
          bg="white"
          m='auto'
          maxW='1500px'          
          minH="50px"
          h={["7vh","8vh","9vh","10vh"]}
          boxShadow="0 10px 20px"
          borderBottom="1px solid black"
        >          
          <Heading fontSize={[20,23,25,30]} m="auto" ml={7} as={motion.h1} size={size}>
            {pageTitle}
          </Heading>
          
        </Flex>
        <Box bg="whiteAlpha.300">
          <Box 
          pt={["35px","40px","45px","50px"]}
          pr={["5px","40px","40px","40px"]}
          pb={["50px"]}
          pl={["5px","40px","40px","40px"]}
          >{children}</Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormatBlank;
