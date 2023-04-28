import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  FaBell,
  FaHeadset,
  FaHeart,
  FaPowerOff,
  FaUserAlt,
  FaWallet,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import { auth } from "../../firebase/clientApp";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import { modState } from "../atoms/Modalatom";
import { SideBarItem } from "./SideBarItem";
import { useClickOutside } from "../../items/customHooks/useClickOutside";
export const ClientSideBar = () => {
  const [show, setShow] = useState(false);

  const { errorToast } = useCustomToast();
  const [user, loading, error] = useAuthState(auth);
  const routeBg = "blue.300";
  const setAuthModelState = useSetRecoilState(modState);
  const route = useRouter().route;
  let domNode = useClickOutside(() => {
    setShow(false);
  });
  return (
    <Flex
      as={motion.div}
      maxW="100vw"
      animate={show ? { width: "60vw" } : { width: 10 }}
      position="sticky"
      zIndex={10}
      top={0}
      bg={useColorModeValue("gray.300","gray.500")}
      h="60vh"
      minH="530px"
      ref={domNode}
      flexDir="column"
      flexGrow={1}
    >
      <Flex flexGrow={5} flexDir="column">
        <Flex
          _hover={{ bg: "blue.300", borderRadius: "5px" }}
          align="center"
          flexGrow={1}
          cursor="pointer"
          onClick={() => setShow(!show)}
        >
          <Flex ml={2} w="100%" align="center">
            {show && <Text>{user ? user.displayName : "Usuario"}</Text>}
            <Flex w="100%" justify={show ? "flex-end" : "flex-start"}>
              <Box
                as={motion.div}
                whileHover={{}}
                animate={show ? { rotate: 90, color: "#2961EE" } : "none"}
              >
                <HamburgerIcon mr={2} fontSize={20} />
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <SideBarItem
          bgProp={route === "/clientPages/miCuenta" ? routeBg : "none"}
          icon={FaUserAlt}
          href="/clientPages/miCuenta"
        >
          {show && (
            <Text cursor="pointer" w="100%">
              Mi cuenta
            </Text>
          )}
        </SideBarItem>
        <SideBarItem
          bgProp={route === "/clientPages/misCompras" ? routeBg : "none"}
          icon={FaWallet}
          href="/clientPages/misCompras"
        >
          {show && (
            <Text display cursor="pointer">
              Mis compras
            </Text>
          )}
        </SideBarItem>
        <SideBarItem
          bgProp={route === "/clientPages/favoritos" ? routeBg : "none"}
          icon={FaHeart}
          href={`/clientPages/favoritos?cd=${user ? user.uid : "noUser"}`}
        >
          {show && (
            <Text mr="20vw" cursor="pointer">
              Favoritos
            </Text>
          )}
        </SideBarItem>
      </Flex>
      <Divider mb="10%" />
      <Flex flexGrow={5} flexDir="column">
        <SideBarItem
          bgProp={route === "/clientPages/notificaciones" ? routeBg : "none"}
          icon={FaBell}
          href="/clientPages/notificaciones"
        >
          {show && <Text cursor="pointer">Notificaciones</Text>}
        </SideBarItem>
        <SideBarItem
          bgProp={route === "/clientPages/configuracion" ? routeBg : "none"}
          icon={FiSettings}
          href="/clientPages/configuracion"
        >
          {show && <Text cursor="pointer">Configuracion</Text>}
        </SideBarItem>

        <SideBarItem href="/ayuda" icon={FaHeadset}>
          {show && <Text cursor="pointer">Ayuda</Text>}
        </SideBarItem>

        <Flex
          _hover={{ bg: "blue.300", borderRadius: "5px" }}
          align="center"
          flexGrow={1}
          cursor="pointer"
          onClick={() => {
            setAuthModelState({
              open: true,
              view: user ? "logout" : "login",
            });
            !user && errorToast("No has iniciado sesion");
          }}
        >
          <Flex ml={3} align="center" width="100%">
            <Icon as={FaPowerOff} mr={2} />
            {show && <Text >Cerrar Sesion</Text>}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
