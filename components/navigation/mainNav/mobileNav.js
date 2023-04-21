import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import NavItem from "../../../items/navItem";

const links = [
  ["Home", "/"],
  ["Productos", "/productPages/busquedaProducts"],
  ["Nosotros", "/about"],
  ["Contacto", "/contact"],
];

export const MobileNav = ({display,changeDisplay}) => {
  return (
    <Flex
      w="100vw"
      bgColor="gray.50"
      zIndex={20}
      height="100vh"
      pos="fixed"
      top="0"
      left="0"
      overflowY="auto"
      flexDir="column"
      display={display}
    >
      <Flex justify="flex-end">
        <IconButton
          onClick={changeDisplay}
          mt={2}
          mr={2}
          aria-label="Close Menu"
          size="lg"
          icon={<CloseIcon />}
          color="blackAlpha.700"
        />
      </Flex>
      <Flex flexDir="column" align="center" p={5}>
        {links.map((link) => {
          return (
            <Button
              onClick={changeDisplay}
              key={link[0]}
              w="100vw"
              color="blackAlpha.700"
              colorScheme="blue.300"
              variant="outline"
              outlineColor="blackAlpha.500"
            >
              <NavItem href={link[1]}>{link[0]}</NavItem>
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};
