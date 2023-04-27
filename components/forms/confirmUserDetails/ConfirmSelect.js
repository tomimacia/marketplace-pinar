import { FormLabel, Select } from "@chakra-ui/react";
import React from "react";

export const ConfirmSelect = ({ customTitle,options, onChange, title, placeholder }) => {
  return (
    <>
      <FormLabel>{customTitle || title}</FormLabel>
      <Select size={['xs',"sm","sm","md"]} name={title} onChange={onChange} placeholder={placeholder}>
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </Select>
    </>
  );
};
