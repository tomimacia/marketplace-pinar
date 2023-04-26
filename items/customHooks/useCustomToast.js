import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();
  const successToast = (title) => {
    return toast({
      title: title,
      status: "success",
      isClosable: true,
    });
  };
  const errorToast = (title) => {
    return toast({
      title: title,
      status: "error",
      isClosable: true,
    });
  };
  return { errorToast, successToast };
};
