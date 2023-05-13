import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { context } from "../../contexts/userContext";
import { auth } from "../../firebase/clientApp";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import ModalTest from "../Modal/ModalLog";
import { modState } from "../atoms/Modalatom";
import { Avatars } from "./Avatars";
import { ClientNavLink } from "./ClientNavLink";
import { linkTags, sellerTags } from "./ClientNavTags";
import { ProfileImage } from "./ProfileImage";
import { MdReportProblem, MdVerified } from "react-icons/md";

export const ClientNavigation = () => {
  const [show, setShow] = useState(false);
  const { errorToast } = useCustomToast();
  const [user, loading, error] = useAuthState(auth);
  const setAuthModelState = useSetRecoilState(modState);
  const { userRef } = useContext(context);

  return (
    <Flex justify="flex-end" width={["100%", "100%", "90%", "400px"]}>
      <AnimatePresence exitBeforeEnter>
        {show && <Avatars showClick={() => setShow(false)} />}
      </AnimatePresence>
      {!loading && (
        <Button
          size={["md", "sm", "sm", "sm"]}
          mr={["10px", "10px", "20px", "20px"]}
          display={user ? "none" : ["none", "flex", "flex", "flex"]}
          flexGrow={1}
          onClick={() => setAuthModelState({ open: true, view: "signup" })}
        >
          Registrate
        </Button>
      )}
      <ModalTest />

      {!loading &&
        (user ? (
          <Flex
            gap={1}
            mr={2}
            justify="center"
            align="center"
            minW="40%"
            bg={useColorModeValue("teal.400", "teal.700")}
            borderRadius="10px"
          >
            <Text userSelect="none" fontWeight="bold" fontSize="14px">
              {`Hola ${
                userRef?.Nombre ? userRef.Nombre : user?.displayName || ""
              }!`}
            </Text>
            {user?.emailVerified ? (
              <MdVerified color="#2cd5a0" title="Email verificado" />
            ) : (
              <MdReportProblem color="red" title="Verifica tu email" />
            )}
          </Flex>
        ) : (
          <Button
            size="sm"
            mr={["10px", "10px", "20px", "20px"]}
            flexGrow={1}
            onClick={() => setAuthModelState({ open: true, view: "login" })}
          >
            Ingresá
          </Button>
        ))}

      {!loading && (
        <Menu>
          <MenuButton
            size="sm"
            width={["69px", "60px", "60px", "60px"]}
            borderRadius="50%"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Icon
              as={AiOutlineUser}
              cursor="pointer"
              _hover={{ color: "blackAlpha.400" }}
              fontSize={25}
            />
          </MenuButton>
          <MenuList zIndex={15}>
            <MenuItem minH="48px">
              <ProfileImage
                showFunction={() => setShow(true)}
                img={userRef?.Img}
                userPhoto={user?.photoURL}
              />
              <Flex cursor="auto" flexDir="column">
                <span>Mi Usuario</span>
                <Text fontSize={13}>{user && user.email}</Text>
              </Flex>
            </MenuItem>
            {linkTags(user).map((lnk) => {
              return <ClientNavLink key={lnk[0]} title={lnk[0]} end={lnk[1]} />;
            })}
            {userRef?.isAdmin && (
              <ClientNavLink
                title={"Admin"}
                end={"/clientPages/admin/createAdmin"}
                isSeller
              />
            )}
            {userRef?.isSeller &&
              sellerTags(loading, user).map((lnk) => {
                return (
                  <ClientNavLink
                    key={lnk[0]}
                    title={lnk[0]}
                    end={lnk[1]}
                    isSeller
                  />
                );
              })}

            <MenuItem
              _hover={{ bg: "blue.200", borderRadius: "10px" }}
              onClick={() => {
                setAuthModelState({
                  open: true,
                  view: user ? "logout" : "login",
                });
                !user && errorToast("No has iniciado sesion");
              }}
            >
              Cerrar Sesion
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};
