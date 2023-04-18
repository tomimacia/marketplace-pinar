import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { context } from "../../contexts/userContext";
import { auth } from "../../firebase/clientApp";
import ModalTest from "../Modal/modalLog";
import { modState } from "../atoms/modalatom";
import { ProfileImage } from "./ProfileImage";
import { Avatars } from "./avatars";
import { ClientNavLink } from "./clientNavLink";
import { linkTags, sellerTags } from "./clientNavTags";


export const ClientNavigation = () => {  
  
  const [show, setShow] = useState(false);
  const ctx = useContext(context);
  const toast = useToast();
  const [user, loading, error] = useAuthState(auth);
  const setAuthModelState = useSetRecoilState(modState);
  
  
  return (
    <Flex width={["100%", "100%", "90%", "400px"]}>
      {show && (
        <Avatars          
          showClick={() => setShow(false)}
          user={user}
        />
      )}
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

      {!loading && (
        <Button
          size="sm"
          mr={["10px", "10px", "20px", "20px"]}
          bg={user ? "teal.400" : null}
          _hover={user ? { bg: "teal.300" } : null}
          flexGrow={1}
          onClick={
            user ? null : () => setAuthModelState({ open: true, view: "login" })
          }
        >
          {user
            ? `Hola ${!loading && user.displayName}!`
            : "Ingresá"}
        </Button>
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
            {
              <Icon
                as={AiOutlineUser}
                cursor="pointer"
                _hover={{ color: "blackAlpha.400" }}
                fontSize={25}
              />
            }
          </MenuButton>
          <MenuList zIndex={15}>
            <MenuItem minH="48px">
              <ProfileImage
                showFunction={() => setShow(true)}
                img={user && ctx.Img}
                user={user}
                userPhoto={!loading && user.Img}
                defaultProf={'images/avatars/default.jpg'}
              />
              <Flex cursor="auto" flexDir="column">
                <span>Mi Usuario</span>
                <Text fontSize={13}>{user && user.email}</Text>
              </Flex>
            </MenuItem>
            {linkTags(loading,user).map((lnk) => {
              return <ClientNavLink title={lnk[0]} end={lnk[1]} />;
            })}
            {ctx.isAdmin && (
              <ClientNavLink
                title={"Admin"}
                end={"/clientPages/admin/createAdmin"}
                isSeller
              />
            )}
            {ctx.isSeller &&
              sellerTags(loading,user).map((lnk) => {
                return <ClientNavLink title={lnk[0]} end={lnk[1]} isSeller />;
              })}

            <MenuItem
              _hover={{ bg: "blue.200", borderRadius: "10px" }}
              onClick={() => {
                setAuthModelState({
                  open: true,
                  view: user ? "logout" : "login",
                });
                !user
                  ? toast({
                      title: `No has iniciado sesion`,
                      status: "error",
                      isClosable: true,
                    })
                  : "";
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
