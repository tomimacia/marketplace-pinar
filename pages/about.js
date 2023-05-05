import { Text } from "@chakra-ui/react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout
      hasTransition={true}
      headTitle="Sobre nosotros"
      pageTitle="Sobre nosotros"
    >
      <Text
        p={25}
        fontWeight="bold"
        fontStyle="oblique"
        pt={10}
        fontSize={[16,18,19,20]}
        letterSpacing="1px"       
         
        
      >
        ¡Bienvenido a Marketplace Pinar! Somos un marketplace en línea con sede
        en Buenos Aires, zona sur, partido de Almirante Brown. Nuestro objetivo
        es conectar vendedores certificados con compradores en todo el país,
        para brindar una experiencia de compra fácil y segura.
        {<br/>}
        {<br/>}
         En Marketplace
        Pinar, nos enorgullece ofrecer una amplia variedad de productos de
        calidad, desde ropa y accesorios hasta artículos para el hogar y
        electrónica. Nos aseguramos de que nuestros vendedores sean de confianza
        y estén certificados, para garantizar la satisfacción de nuestros
        clientes. 
        {<br/>}
        {<br/>}
        Nos esforzamos por hacer que la experiencia de compra sea lo
        más conveniente posible. Con una interfaz fácil de usar, puede encontrar
        productos de manera rápida y eficiente. Además, nuestro equipo de
        atención al cliente está siempre disponible para ayudarlo en cualquier
        problema o duda que pueda tener. 
        {<br/>}        
        {<br/>}        
        En Marketplace Pinar, nuestra pasión
        por la excelencia nos impulsa a seguir creciendo y mejorando
        continuamente. ¡Gracias por elegirnos y disfrutar de la experiencia de
        compra en nuestro marketplace!
      </Text>
    </Layout>
  );
};

export default About;
