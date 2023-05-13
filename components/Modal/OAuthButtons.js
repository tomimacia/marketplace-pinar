import { Button, Flex, Image, Text } from "@chakra-ui/react";

import React, { useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { auth } from "../../firebase/clientApp";
import { modState } from "../atoms/Modalatom";
import googleLogo from "../../public/images/googlelogo.png";
import { useRouter } from "next/router";
const OAuthButtons = () => {
  const setAuthModelState = useSetRecoilState(modState);
  const [handleError, setError] = useState("");
  const router = useRouter();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  if (error) {
    setError(error);
  }

  const signUpWithGoogle = async () => {
    try {
      await signInWithGoogle();      
      if (modState.view === "signUp") {
        router.push("/clientPages/confirmUserDetails");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setAuthModelState((prev) => ({
        ...prev,
        open: false,
      }));
    }
  };
  return (
    <Flex direction="column" w="100%" mb={4}>
      <Button
        w="100%"
        h="34px"
        mb={2}
        borderColor="gray.300"
        color="black"
        _hover={{ bg: "gray.300" }}
        border="1px solid"
        borderRadius="60px"
        fontSize="10pt"
        fontWeight="700"
        _focus={{ boxShadow: "none" }}
        isLoading={loading}
        onClick={() => {
          signUpWithGoogle();
        }}
      >
        <Image
          mr={[3, 4, 5, 5]}
          h={["15px", "17px", "20px", "20px"]}
          src={googleLogo.src}
        />
        <Text fontSize={["xs", "sm", "sm", "md"]}>Continuar con Google</Text>
      </Button>

      {handleError && <Text color="red">{handleError}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
