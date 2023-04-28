import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { auth } from "../../firebase/clientApp";
import { modState } from "../atoms/Modalatom";
import { useCategories } from "../../items/customHooks/useCategories";
export const ProductsNav = () => {
  const [user, loading, error] = useAuthState(auth);
  const setAuthModelState = useSetRecoilState(modState);
  const {categories} = useCategories()
  
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
          {categories.map((cat, i) => {
            return (
              <Link key={"prodNavLink"+cat.id} href={`/productPages/productInterface?Category=${cat.id}`}>
                <MenuItem
                  _hover={{ bg: "#aaa", borderRadius: "10px" }}                  
                >
                  {cat.id}
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>

      {!loading && user ? (
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
