import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import React from "react";
import NavItem from "./NavItem";

export const NavigationLinks = () => {
  return (
    <Breadcrumb
      flexGrow={1}
      spacing={3}
      display={["none", "none", "none", "flex"]}
    >
      <BreadcrumbItem>
        <NavItem href="/">Home</NavItem>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <NavItem href="/ProductInterface">Productos</NavItem>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <NavItem href="/About">Nosotros</NavItem>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <NavItem href="/Contact">Contacto</NavItem>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
