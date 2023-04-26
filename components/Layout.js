import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import Footer from "./navigation/Footer";
import Navigation from "./navigation/Navigation";
import { layoutA, layoutB } from "../chakra/bgColors";
import { memo } from "react";

const Layout = memo(({
  children,
  headTitle,
  pageTitle,
  hasTransition,
}) => {
  return (
    <Box
      pos="relative"
      scrollBehavior='smooth'
      maxW="100%"
      w="100%"
      minH="100vh"
      maxH="100%"
      h="100%"
      pb="4rem"
      overflowX="hidden"
      bgGradient={useColorModeValue(layoutA, layoutB)}
    >
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>El Pinar | {headTitle}</title>
      </Head>
      <Navigation />
      <Flex pt={0} flexDir="column">
        <Heading
          animate={{
            textAlign: "center",
            fontSize: "50px",
          }}
          flexGrow={1}
          as={motion.h1}                   
          pl={5}
          pt={10}
          align="center"
        >
          {pageTitle}
        </Heading>
      </Flex>
      {hasTransition && (
        <Box
          as={motion.div}
          transitionDuration={"0.5s"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          pb="5rem"
        >
          {children}
        </Box>
      )}
      {!hasTransition && <Box>{children}</Box>}
      <Footer />
    </Box>
  );
});

export default Layout;
