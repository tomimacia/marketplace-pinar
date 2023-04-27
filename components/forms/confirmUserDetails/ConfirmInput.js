import { FormLabel, Input } from "@chakra-ui/react";


export const ConfirmInput = ({title,isRequired,onChange,placeholder,type}) => {
  return (
    <>
      <FormLabel>{`${title} ${isRequired ? "*" : ""}` } </FormLabel>
      <Input
        size={['xs',"sm","sm","md"]}
        name={title}
        type={type}
        onChange={onChange}
        required={isRequired}
        placeholder={placeholder}
      />
    </>
  );
};
