import {
  Box,
  Button,
  Heading,
  Text,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useRouter } from "next/router";

export const WelcomeUser = ({ isGoogle, setOpenWelcome, user, nombre }) => {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  const router = useRouter();
  const backHome = () => {    
    router.push("/");
    setOpenWelcome(false);
  };
  return (
    <ChakraBox
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 1 }}
      backdropFilter="auto"
      pos="fixed"
      top={10}
      left={0}
      zIndex={100}
      w="100%"
      h="100%"
      backdropBlur="4px"
      bg="(0, 0, 0, 0.5)"
    >
      <Box
        textAlign="center"
        alignItems="center"
        p={[2, 5, 10, 10]}
        borderRadius="20px"
        border="1px solid black"
        m="auto"
        h={[300, 550, 700, 700]}
        w={["90%", "75%", "60%", "60%"]}
        bg="blue.400"
      >
        <Box bg="white" borderRadius="20px" p={5}>
          <Heading fontSize={[15, 22, 25, 30]} mb={10}>
            Bienvenido {nombre}!
          </Heading>
          {isGoogle ? (
            <Text mb={5} fontSize={[10, 17, 20, 25]}>
              Muchas gracias por suscribirte a Marketplace el Pinar. <br />
              Vuelve al inicio para comenzar.
            </Text>
          ) : (
            <Text mb={5} fontSize={[12, 17, 20, 20]}>
              Muchas gracias por suscribirte a Marketplace el Pinar. <br />
              Te hemos enviado un email de verificacion al correo{" "}
              {user ? user.email : ""} (si no aparece chequea la casilla de
              spam). <br />
              La verificacion es necesaria para poder realizar compras, pero ya
              puedes navegar y consultar nuestros productos! <br /> Vuelve al
              inicio para comenzar.
            </Text>
          )}

          <Button onClick={backHome} size={["sm", "sm", "md", "md"]}>
            Volver al inicio
          </Button>
        </Box>
      </Box>
    </ChakraBox>
  );
};
