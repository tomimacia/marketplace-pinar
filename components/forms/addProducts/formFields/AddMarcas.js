import React from "react";
import { AddSelect } from "../formComponents/AddSelect";

export const AddMarcas = ({ state, onChange, catToUpdate }) => {
  return (
    <AddSelect
      placeHolder='Selecciona una marca'      
      onChange={onChange}
      title="Marca"
      prop="Marcas"
      catToUpdate={catToUpdate}
    />
  );
};
