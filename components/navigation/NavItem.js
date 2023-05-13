import { Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const navItem = ({ href, as, children }) => {
  return (
    <Text
      _hover={{ color: useColorModeValue("white", "gray.400") }}
      fontSize={18}
      fontWeight="bold"
    >
      <Link href={href} as={as}>
        {children}
      </Link>
    </Text>
  );
};

export default navItem;
