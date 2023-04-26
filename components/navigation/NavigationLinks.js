import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import React from "react";
import NavItem from "../../items/navItem";

export const NavigationLinks = () => {  
  return (
    <Breadcrumb
      flexGrow={1}
      spacing={3}
      display={["none", "none", "none", "flex"]}
    >
      <BreadcrumbItem >
        <NavItem href='/'>Home</NavItem>
      </BreadcrumbItem>
      <BreadcrumbItem >
        <NavItem href='/productPages/busquedaProducts'>Productos</NavItem>
      </BreadcrumbItem>
      <BreadcrumbItem >
        <NavItem href='/about'>Nosotros</NavItem>
      </BreadcrumbItem>
      <BreadcrumbItem >
        <NavItem href='/contact'>Contacto</NavItem>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
