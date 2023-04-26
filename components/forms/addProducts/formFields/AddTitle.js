import { FormLabel, Input } from "@chakra-ui/react";



export const AddTitle = ({inputValueRef}) => {
  return (
    <>
      <FormLabel>Titulo *</FormLabel>
      <Input ref={inputValueRef} type='text' />
    </>
  );
};

