import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { a, b } from "../../chakra/bgColors";
import { ClientNavigation } from "./ClientNavigation";

import { CartAndColorSwitch } from "./CartAndColorSwitch";
import { NavigationLinks } from "./NavigationLinks";
import { ProductsNav } from "./ProductsNav";
import { SearchInputAndIcon } from "./SearchInputAndIcon";
import { MobileNav } from "./mainNav/MobileNav";
import { AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <Box bgGradient={useColorModeValue(a, b)} p={1}>
      <Flex width="100%" height={50} alignItems="center">
        <NavigationLinks />

        <Flex flexGrow={1}>
          <Flex flexGrow={5}>
            <IconButton
              display={["none", "flex", "flex", "none"]}
              icon={<HamburgerIcon />}
              aria-label="Open Menu"
              onClick={() => setShowMobileNav(true)}
              mr={2}
            />
            <SearchInputAndIcon />
          </Flex>
          <CartAndColorSwitch />
        </Flex>
      </Flex>

      <Flex mt={2}>
        <Flex display={["none", "flex", "flex", "flex"]} flexGrow={1}>
          <ProductsNav />
        </Flex>
        <Flex>
          <IconButton
            display={["flex", "none", "none", "none"]}
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={() => setShowMobileNav(true)}
            mr={2}
            justify="left"
            size="sm"
          />
        </Flex>
        <Flex flexGrow={1} justify="right">
          <ClientNavigation />
        </Flex>
      </Flex>
      <Flex>
        <Flex mt={2} display={["flex", "none", "none", "none"]} flexGrow={1}>
          <ProductsNav />
        </Flex>
      </Flex>

      <AnimatePresence>
        {showMobileNav && (
          <MobileNav changeDisplay={() => setShowMobileNav(false)} />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navigation;
