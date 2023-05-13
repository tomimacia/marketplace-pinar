import { Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BeatLoader } from "react-spinners";
import { FormatClient } from "../../components/client/FormatClient";
import { context } from "../../contexts/userContext";
import ClientData from "../../items/ClientData";

const MiCuenta = () => {
  
  const { userRef } = useContext(context);
  
  return (
    <Box>
      <FormatClient title="Mi Cuenta">
        {userRef === "loadingUser" && (
          <Flex mt={10} justify="center">
            <BeatLoader color="#68EBBB" />
          </Flex>
        )}
        {userRef !== ("loadingUser" || "offline") && userRef?.email ? (
          <ClientData userRef={userRef} />
        ) : (
          <Text
            mt={5}
            align="center"
            fontSize={[10, 20, 20, 20]}
            color="blackAlpha.500"
          >
            Inicia sesion
          </Text>
        )}
      </FormatClient>
    </Box>
  );
};

export default MiCuenta;
