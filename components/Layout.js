import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Footer from "./navigation/Footer";
import Navigation from "./navigation/Navigation";
import { layoutA, layoutB } from "../chakra/bgColors";
import { memo } from "react";
import HeadLogo from "../public/HeadLogo.png"
const Layout = memo(({ children, headTitle, pageTitle, hasTransition }) => {
  return (
    <Box
      pos="relative"
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
        <link rel="icon" href={HeadLogo.src} type="image/x-icon" />
        <title>El Pinar | {headTitle}</title>
      </Head>
      <Navigation />
      <Flex pt={0} flexDir="column">
        {pageTitle && (
          <AnimatePresence mode='wait' initial={true}>
            <Heading
              flexGrow={1}
              as={motion.h3}
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              p={5}
              placeSelf="center"
              fontSize={["25px","30px","35px","40px"]}
            >
              {pageTitle}
            </Heading>
          </AnimatePresence>
        )}

        {hasTransition && (
          <Box
            as={motion.div}
            transitionDuration={"0.5s"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            pb="5rem"            
            alignContent="center"
          >
            {children}
          </Box>
        )}
        {!hasTransition && <Box>{children}</Box>}
      </Flex>
      <Footer />
    </Box>
  );
});

export default Layout;
