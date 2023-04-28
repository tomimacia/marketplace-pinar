import React from "react";
import { BusquedaGeneral } from "./BusquedaGeneral";
import {
  useCategoria,
  useSearchInputValue,
} from "../../contexts/productsContext";
import { NoResults } from "./NoResults";

export const NoProducts = () => {
  const categoria = useCategoria();
  const searchInputValue = useSearchInputValue();  
  return (
      <>
      {!categoria && searchInputValue.length < 1 ? (
        <BusquedaGeneral />
      ) : (
        <NoResults />
      )}
      </>
      
    
  );
};
