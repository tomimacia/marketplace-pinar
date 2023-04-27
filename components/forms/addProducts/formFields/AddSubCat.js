import React from "react";
import { AddSelect } from "../formComponents/AddSelect";

export const AddSubCat = ({onChange,catToUpdate}) => {
  return (
    <AddSelect
      isRequired
      placeHolder='Selecciona una subcategoria'      
      title="Subcategoria"
      onChange={onChange}
      prop="SubCat1"
      catToUpdate={catToUpdate}
    />
  );
};
