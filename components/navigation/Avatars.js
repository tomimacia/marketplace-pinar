import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";

import { doc, updateDoc } from "firebase/firestore";
import { isValidMotionProp, motion } from "framer-motion";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BeatLoader } from "react-spinners";
import { auth, firestore } from "../../firebase/clientApp";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import { dogs, profiles } from "../../public/images/avatars/exportAvatars";

export const Avatars = ({ showClick }) => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [user, loading] = useAuthState(auth);
  const { errorToast, successToast } = useCustomToast();
  const allAvatars = [...dogs, ...profiles];
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  const handleImg = async (prop) => {
    if (!loading && user) {
      setLoadingImg(true);
      await updateDoc(doc(firestore, "users", user.uid), {
        Img: prop,
      });
      setLoadingImg(false);
      window.location.reload();
      successToast("Avatar actualizado correctamente");
    } else {
      errorToast("Inicia sesion");
    }
  };
  return (
    <ChakraBox
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ duration: 0.4, type: "tween" }}
      zIndex={100}
      minH="100%"
      minW="100%"
      left={0}
      top={0}
      pos="absolute"
      bg="gray.400"
    >
      <Flex pos="relative" w="100%" flexDir="column">
        <Heading m={10} align="center">
          Selecciona tu Avatar
        </Heading>
        <Flex p={2} bg="gray.300" minW="100%">
          <Flex
            boxShadow="0 10px 10px"
            borderRadius="20px"
            m="0 auto"
            maxW="850px"
            bg="gray.200"
            align="center"
            flexDir="column"
          >
            <Flex justify="flex-end" width="100%">
              <IconButton
                mt={2}
                mr={2}
                onClick={showClick}
                size="sm"
                icon={<CloseIcon />}
                color="blackAlpha.700"
                bg="blackAlpha.300"
              />
            </Flex>
            {loadingImg ? (
              <Flex position="absolute" mt={5} justify="center">
                <BeatLoader color="#68EBBB" />
              </Flex>
            ) : null}
            <Flex
              justifyContent="center"
              p={3}
              w={["100%", "95%", "90%", "85%"]}
              flexWrap="wrap"
            >
              {allAvatars.map((ph, i) => {
                return (
                  <Flex m={2} key={"P" + i + 1}>
                    <Image
                      cursor="pointer"
                      alt={ph.alt}
                      onClick={() => handleImg(ph.src)}
                      _hover={{ opacity: "0.8" }}
                      h="70px"
                      borderRadius="50%"
                      src={ph.src}
                    />
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraBox>
  );
};
