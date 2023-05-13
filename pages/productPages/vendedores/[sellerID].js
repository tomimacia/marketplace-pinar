import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiEdit } from "react-icons/bi";
import FormatBlank from "../../../components/FormatBlank";
import { SellerProductsDeploy } from "../../../components/dynamicSellers/SellerProductsDeploy";
import { TakeAwayEnvios } from "../../../components/dynamicSellers/TakeAwayEnvios";
import { auth } from "../../../firebase/clientApp";
import { getSingleDoc } from "../../../firebase/services/getSingleDoc";
import { useSellerID } from "../../../items/customHooks/useSellerID";

export async function getServerSideProps({ params }) {
  const resp = await getSingleDoc("users", params.sellerID);
  const seller = resp.data();
  delete seller.fechaDeSuscripcion;
  return {
    props: {
      sellerRef: seller,
      sellerID: params.sellerID,
    },
  };
}

export default function ProductsDynamic({ sellerRef, sellerID }) {
  const [user] = useAuthState(auth);
  const { products, loadedProducts, prodError } = useSellerID(sellerID);

  return (
    <Box>
      <FormatBlank
        headTitle={sellerRef.sellerName}
        pageTitle={
          <Flex
            fontSize={["20px", "30px", "30px", "35px"]}
            w="100%"
            align="center"
          >
            {sellerRef.sellerName}
            {user && user.uid === sellerID && (
              <Icon
                _hover={{ color: "#9b9b9b" }}
                cursor="pointer"
                as={BiEdit}
                ml={2}
              />
            )}
          </Flex>
        }
      >
        <Flex m="auto" maxW="1500px" flexDir="column">
          <Flex pb={5} borderBottom="3px solid black">
            <Image
              m="auto"
              objectFit="cover"
              objectPosition="top"
              borderRadius="10px"
              h="15vh"
              w="80vw"
              src={sellerRef.sellerSpecs.Img1}
              mb={5}
            />
            {user && user.uid === sellerID && (
              <Icon
                _hover={{ color: "#c7c7c7" }}
                cursor="pointer"
                fontSize="25px"
                as={BiEdit}
                right={12}
              />
            )}
          </Flex>
          <Flex p={3} flexDir="column">
            <Heading
              fontWeight="bold"
              fontSize={["15px", "20px", "20px", "25px"]}
              m="30px 0 20px 0"
            >
              Sobre nosotros
            </Heading>
            <Text lineHeight="25px" fontSize={["13px", "15px", "16px", "17px"]}>
              Bienvenidos a nuestra tienda en línea, donde podrás encontrar una
              gran variedad de productos que van desde electrónica, moda, hogar,
              belleza y mucho más.<br/><br/>Somos un equipo de vendedores
              comprometidos con brindar la mejor experiencia de compra a
              nuestros clientes, ofreciendo productos de alta calidad a precios
              competitivos.<br/><br/>Nuestra misión es satisfacer las necesidades
              de nuestros clientes, por lo que nos aseguramos de que cada
              producto que ofrecemos cumpla con altos estándares de calidad.
              Además, nos esforzamos por proporcionar un servicio al cliente
              excepcional, para que nuestros clientes se sientan seguros y
              satisfechos en todo momento.<br/><br/>Nos enorgullece ofrecer una
              amplia variedad de productos de diferentes marcas y proveedores
              confiables, lo que nos permite ofrecer una gran selección de
              productos a precios atractivos. También nos aseguramos de
              mantenernos actualizados con las últimas tendencias y novedades en
              el mercado para ofrecer productos innovadores y a la moda.
              <br />
              <br />
              Si tienes alguna pregunta o comentario, no dudes en ponerte en
              contacto con nosotros. Estamos aquí para ayudarte y esperamos que
              disfrutes de tu experiencia de compra en nuestra tienda en línea.
            </Text>
          </Flex>
          <TakeAwayEnvios sellerRef={sellerRef} />
          <Flex pl={2} pr={2} mt={10} w="100%" flexDir="column">
            <Flex>
              <Heading
                mt={10}
                mb={[10, 15, 18, 20]}
                fontSize={["15px", "20px", "20px", "25px"]}
              >
                Algunos de nuestros productos:
              </Heading>
            </Flex>
            {!loadedProducts ? (
              <Progress m="22px" size="xs" isIndeterminate />
            ) : (
              <SellerProductsDeploy products={products} />
            )}
          </Flex>
        </Flex>
      </FormatBlank>
    </Box>
  );
}
