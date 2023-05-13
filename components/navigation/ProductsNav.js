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
  const [user, loading] = useAuthState(auth);
  const setAuthModelState = useSetRecoilState(modState);
  const { categories } = useCategories();

  return (
    <Flex gap={2}>
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
              <Link
                key={"prodNavLink" + cat.id}
                href={`/ProductInterface?Category=${cat.id}`}
              >
                <MenuItem _hover={{ bg: "#aaa", borderRadius: "10px" }}>
                  {cat.id}
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>

      {!loading && !user && (
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
      <Link href="/Ayuda">
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
