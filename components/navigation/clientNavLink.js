import { MenuItem } from "@chakra-ui/react";
import Link from "next/link";

export const ClientNavLink = ({ title, end, isSeller }) => {
  return (
    <Link href={end}>
      <MenuItem bg={isSeller && "blue.500"} fontWeight={isSeller && "bold"} borderRadius="10px" _hover={{ bg: "blue.200", borderRadius: "10px" }}>
        {title}
      </MenuItem>
    </Link>
  );
};
