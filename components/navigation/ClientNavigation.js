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
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { context } from "../../contexts/userContext";
import { auth } from "../../firebase/clientApp";
import ModalTest from "../Modal/ModalLog";
import { modState } from "../atoms/Modalatom";
import { ProfileImage } from "./ProfileImage";
import { Avatars } from "./Avatars";
import { ClientNavLink } from "./ClientNavLink";
import { linkTags, sellerTags } from "./ClientNavTags";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import { AnimatePresence } from "framer-motion";

export const ClientNavigation = () => {
  const [show, setShow] = useState(false);
  const ctx = useContext(context);
  const { errorToast } = useCustomToast();
  const [user, loading, error] = useAuthState(auth);
  const setAuthModelState = useSetRecoilState(modState);

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

      {!user && !loading ? (
        <Button
          size="sm"
          mr={["10px", "10px", "20px", "20px"]}
          flexGrow={1}
          onClick={() => setAuthModelState({ open: true, view: "login" })}
        >
          Ingresá
        </Button>
      ) : (
        <Box
          p={1}
          mr={2}
          align="center"
          minW="40%"
          bg={useColorModeValue("teal.400","teal.700")}
          borderRadius="10px"
        >
          <Text userSelect="none" fontWeight="bold" fontSize="14px">{`Hola ${
            !loading && user.displayName
          }!`}</Text>
        </Box>
      )}

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
                img={ctx?.Img}
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
            {ctx.isAdmin && (
              <ClientNavLink
                title={"Admin"}
                end={"/clientPages/admin/createAdmin"}
                isSeller
              />
            )}
            {ctx.isSeller &&
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
