import { FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";

export const AddDescription = ({inputValueRef}) => {
  return (
    <>
      <FormLabel mt={5}>Descripcion *</FormLabel>
      <Textarea ref={inputValueRef} />
    </>
  );
};
