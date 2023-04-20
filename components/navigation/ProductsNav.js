import {
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { modState } from "../atoms/modalatom";
import { auth } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetCategoria } from "../../contexts/productsContext";
import { useRouter } from "next/router";
export const ProductsNav = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()
  const setAuthModelState = useSetRecoilState(modState);
  const setCategory = useSetCategoria();
  const linkTags = [
    "Deportes",
    "Herramientas",
    "Inmuebles",
    "Inmuebles",
    "Tecnologia",
    "Supermercado",
    "Vehiculos",
  ];
  const onClickFunction = (cat) => {
    setCategory(cat);
    router.push(`/productPages/productInterface`, "productsInterfaceRedirect");
  };
  return (
    <Flex>
      <Menu>
        <MenuButton
          _hover={{ bg: "#aaa" }}
          as={Button}
          size="sm"
          rightIcon={<ChevronDownIcon />}
        >
          Categorias
        </MenuButton>
        <MenuList zIndex={15} width="40vw">
          {linkTags.map((link,i) => {
            return (
              <MenuItem
                key={link+i*2}
                onClick={() => onClickFunction(link)}
                _hover={{ bg: "#aaa", borderRadius: "10px" }}
              >
                {link}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      {user ? (
        <Link href="/ofertas">
          <Button
            display={["flex", "none", "none", "none"]}
            size="sm"
            ml={1}
            mr={1}
            _hover={{ bg: "#aaa" }}
          >
            Ofertas
          </Button>
        </Link>
      ) : (
        <Button
          display={["flex", "none", "none", "none"]}
          size="sm"
          ml={1}
          mr={1}
          onClick={() => setAuthModelState({ open: true, view: "signup" })}
          _hover={{ bg: "#aaa" }}
        >
          Registrate
        </Button>
      )}
      <Link href="/ofertas">
        <Button
          display={["none", "none", "flex", "flex"]}
          size="sm"
          ml={1}
          mr={1}
          onClick={""}
          _hover={{ bg: "#aaa" }}
        >
          Ofertas
        </Button>
      </Link>
      <Link href="/ayuda">
        <Button
          display={["none", "none", "flex", "flex"]}
          size="sm"
          onClick={""}
          _hover={{ bg: "#aaa" }}
        >
          Ayuda
        </Button>
      </Link>
    </Flex>
  );
};
