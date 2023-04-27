import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const WelcomeUser = ({ user, display, nombre }) => {
  return (
    <Box
      backdropFilter="auto"
      display={display}
      pos="absolute"
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
        <Heading fontSize={[15, 22, 25, 30]} mb={10}>
          Bienvenido {nombre}!
        </Heading>
        <Text mb={5} fontSize={[10, 17, 20, 25]}>
          Muchas gracias por suscribirte a Marketplace el Pinar. <br />
          Te hemos enviado un email de verificacion al correo{" "}
          {user ? user.email : ""} (si no aparece chequea la casilla de spam).{" "}
          <br />
          La verificacion es necesaria para poder realizar compras, pero ya
          puedes navegar por el sitio y consultar nuestros productos. <br />{" "}
          Vuelve al inicio para comenzar a utilizar tu usuario.
        </Text>
        <Link href="/">
          <Button size={["sm", "sm", "md", "lg"]}>Volver al inicio</Button>
        </Link>
      </Box>
    </Box>
  );
};
