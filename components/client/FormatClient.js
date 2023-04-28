import { Box, Flex, Heading } from "@chakra-ui/react";
import { ClientSideBar } from "./ClientSideBar";
import { motion } from "framer-motion";
import Layout from "../Layout";

export const FormatClient = ({ children, title, cartIndex }) => {
  return (
    <Layout hiddenTitle={title} title="hola" cartIndex={cartIndex}>
      <Flex align="center" justify="center" h="57px" bg="teal.400">
        <Heading>Publicidad</Heading>
      </Flex>
      <Flex gap={1}>
        <Flex w="45px" minW="35px">
          <ClientSideBar />
        </Flex>

        <Flex w="100vw" minH="78.7vh">
          <Box minH="80%" minW="80%" w="100%" h="100%" bg="gray.200">
            <Box pt={1} pb={3} pr={[1, 3, 5, 7]} pl={[1, 3, 5, 7]}>
              <Box p={5} border="1px solid black" borderRadius="15px">
                <Heading
                  as={motion.h1}
                  initial={{ x: "120vw" }}
                  animate={{ x: 0 }}
                  size={["xs", "xs", "sm", "sm"]}
                >
                  {title}
                </Heading>
              </Box>

              <Box
                mt={[2, 4, 7, 10]}                
                p={2}
                border="1px solid black"
                borderRadius="15px"
              >
                {children}
              </Box>
            </Box>
          </Box>
        </Flex>
        <Flex w="5vw" bg="teal.400"></Flex>
      </Flex>
    </Layout>
  );
};
