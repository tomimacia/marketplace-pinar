import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  useColorMode
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { HomeCarousel } from "../components/home/HomeCarousel";
import { useHomeProducts } from "../items/customHooks/useHomeProducts";
const Index = () => {
  const { colorMode } = useColorMode();  
  const { products, loadedProducts } = useHomeProducts();
  console.log(products);
  return (
    <Layout
      hasTransition={true}
      pageTitle="El Pinar | Marketplace"
      headTitle="Marketplace El Pinar"
    >
      <Box>
        <Image
          display={colorMode === "light" ? "flex" : "none"}
          ml={3}
          width={200}
          src="https://elpinar.edu.mx/wp-content/uploads/2020/03/LogoElPinar-e1583287195672.png"
        />
        <Image
          display={colorMode === "light" ? "none" : "flex"}
          ml={3}
          width={200}
          src="https://elpinar.edu.mx/wp-content/uploads/2020/03/LogoElPinar_blanco.png"
        />
        <Flex flexDir='column' mt={20}>
          <Heading m={5}>Hot sale!</Heading>
          <Divider m={1} orientation='horizontal' />
          {loadedProducts &&
            <HomeCarousel products={products} />}
            <Divider m={1} orientation='horizontal' />
        </Flex>
      </Box>
    </Layout>
  );
};

export default Index;
