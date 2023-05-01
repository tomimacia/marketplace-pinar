import { Box, Flex, Heading, Image, useColorMode } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { HomeCarousel } from "../components/home/HomeCarousel";
import { useHomeProducts } from "../items/customHooks/useHomeProducts";
import lightLogo from "../public/images/lightLogo.png";
import blackLogo from "../public/images/blackLogo.png";
const Index = () => {
  const { colorMode } = useColorMode();
  const { products, loadedProducts } = useHomeProducts();

  return (
    <Layout
      hasTransition={true}
      pageTitle="El Pinar | Marketplace"
      headTitle="Marketplace El Pinar"
    >
      <Box>
        <Image
          ml={3}
          width={200}
          src={colorMode === "light" ? lightLogo.src : blackLogo.src}
        />

        <Flex flexDir="column" mt={20}>
          <Heading m={5} color="red">
            Hot Sale!
          </Heading>
          {loadedProducts && <HomeCarousel products={products} />}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Index;
