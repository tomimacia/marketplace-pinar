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
import { ProductsDeploy } from "../../../components/dynamicSellers/ProductsDeploy";
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
  const [user, loading, error] = useAuthState(auth);
  const { products, loadedProducts, prodError } = useSellerID(sellerID);

  return (
    <Box>
      <FormatBlank
        hiddenTitle={sellerRef.sellerName}
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis facilis doloremque tenetur, ab explicabo sequi
              quibusdam, qui reiciendis obcaecati velit asperiores voluptatibus
              provident, soluta libero? Debitis ullam recusandae nemo
              aspernatur?
            </Text>
          </Flex>
          <TakeAwayEnvios sellerRef={sellerRef}/>
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
              <ProductsDeploy products={products} />
            )}
          </Flex>
        </Flex>
      </FormatBlank>
    </Box>
  );
}
