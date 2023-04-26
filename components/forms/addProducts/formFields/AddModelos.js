import React from "react";
import { AddSelect } from "../formComponents/AddSelect";

export const AddModelos = ({  onChange, catToUpdate }) => {
  return (
    <AddSelect
      placeHolder="Selecciona un modelo"      
      onChange={onChange}
      title="Modelo"
      prop="Modelos"
      catToUpdate={catToUpdate}
    />
  );
};
