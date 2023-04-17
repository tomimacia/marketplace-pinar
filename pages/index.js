import { Box, Image, useColorMode } from "@chakra-ui/react";
import Layout from "../components/Layout";
const Index = () => {  
  const { colorMode } = useColorMode();
  
  return (
    <Layout hasTransition={true} mainTitle="Home" title="Marketplace El Pinar">
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
        
      </Box>
    </Layout>
  );
};

export default Index;
