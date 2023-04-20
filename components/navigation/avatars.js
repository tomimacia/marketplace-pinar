import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,  
  Heading,
  IconButton,
  Image,
  useToast,
} from "@chakra-ui/react";

import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/clientApp";
import { dogs, profiles } from "../../public/images/avatars/exportAvatars";
import { useAuthState } from "react-firebase-hooks/auth";

export const Avatars = ({ showClick }) => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();  
  const allAvatars = [...dogs,...profiles]

  const handleImg = async (prop) => {
    if (!loading && user) {
      setLoadingImg(true);
      await updateDoc(doc(firestore, "users", user.uid), {
        Img: prop,
      });
      setLoadingImg(false);      
      window.location.reload();
      toast({
        title: `Avatar actualizado correctamente`,
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: `Inicia sesion`,
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <AnimatePresence exitBeforeEnter >
      <Box
        as={motion.div}        
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -500, opacity: 1 }}
        transitionDuration={'0.5s'}        
        zIndex={100}
        minH="100%"
        minW="100%"
        left={0}
        top={0}
        pos="absolute"
        bg="gray.400"
      >
        <Flex w="100%" flexDir="column">
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
                <Flex mt={10} justify="center">
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
      </Box>
    </AnimatePresence>
  );
};
