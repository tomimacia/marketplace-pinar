import { Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BeatLoader } from "react-spinners";
import { FormatClient } from "../../components/client/FormatClient";
import { context } from "../../contexts/userContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { ClientData } from "../../components/client/ClientData";

const MiCuenta = () => {
  const { userRef } = useContext(context);
  const [user, loading, error] = useAuthState(auth);
  return (
    <Box>
      <FormatClient title="Mi Cuenta">
        {userRef === "loadingUser" && (
          <Flex mt={10} justify="center">
            <BeatLoader color="#68EBBB" />
          </Flex>
        )}
        {userRef?.email && <ClientData userRef={userRef} />}

        {!loading && !user && (
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
