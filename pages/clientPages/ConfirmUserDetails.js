import { Flex, Heading, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ConfirmUserForm } from "../../components/forms/confirmUserDetails/ConfirmUserForm";
import { WelcomeUser } from "../../components/forms/confirmUserDetails/WelcomeUser";
import { auth } from "../../firebase/clientApp";
const confirmUserDetails = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [openWelcome, setOpenWelcome] = useState(false);
  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, []);

  useEffect(() => {
    setColorMode("light");
  }, [colorMode]);

  return (
    <Flex>
      <Head>
        <title>Confirm User</title>
      </Head>
      <Flex
        alignItems="center"
        flexDir="column"
        minH="100vh"
        maxH="100%"
        w="100vw"
        bg="blue.300"
        p={[0, 0, 10, 10]}
      >
        <Heading m={10}>Datos del usuario</Heading>

        <Flex
          borderRadius={[0, "20px", "20px", "20px"]}
          border="5px solid black"
          alignItems="center"
          flexDir="column"
          width={["100%", "80%", "80%", "80%"]}
          bg="white"
          p={[0, 0, 0, 5]}
        >
          <Heading as="h2" size="sm" mb={3}>
            Bienvenido {!loading && user && (user?.displayName || user?.email)}!
          </Heading>
          <Heading as="h3" size="sm" mb={3}>
            Completa los datos requeridos (*) para continuar
          </Heading>
          <ConfirmUserForm user={user} setOpenWelcome={setOpenWelcome} />
        </Flex>
      </Flex>
      {openWelcome && (
        <WelcomeUser
          setOpenWelcome={setOpenWelcome}
          isGoogle={user?.providerData[0].providerId === "google.com"}
          user={user}
          nombre={user.displayName}
        />
      )}
    </Flex>
  );
};

export default confirmUserDetails;
