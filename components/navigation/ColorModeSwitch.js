import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      outlineColor={useColorModeValue("blackAlpha.400", "gray.400")}
      cursor="pointer"
      fontSize={18}
      mt={1}
      size="sm"
      _hover={{ color: "blackAlpha.400" }}
      bg="transparent"
      mr="45px"
    >
      Switch Mode
    </IconButton>
  );
};
