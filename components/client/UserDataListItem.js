import { Button, Flex, Icon, Progress, Text } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { context } from "../../contexts/userContext";
import { auth, firestore } from "../../firebase/clientApp";
import { useCustomToast } from "../../items/customHooks/useCustomToast";
import { MdCancel, MdCheckCircle } from "react-icons/md";

export const UserDataListItem = ({
  isEmail,
  title,
  setInputValue,
  inputValue,
  onClickBlur,
  blurProp,
  children,
  userProp,
}) => {
  const [user, loading, error] = useAuthState(auth);
  const [displayProp, setDisplayProp] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const { userRef, updateUser } = useContext(context);
  const format = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const onClickAceptar = async () => {
    if (inputValue === userRef[userProp])
      return errorToast("Ingresa un valor distinto al anterior");
    if (!inputValue) return errorToast("Ingrea un valor");
    if (isValid) {
      try {
        setLoadingUpdate(true);
        await updateDoc(doc(firestore, "users", user.uid), {
          [`${userProp}`]: inputValue,
        });
        successToast("Actualizado correctamente");
        updateUser();
        setInputValue(null);
        setLoadingUpdate(false);
      } catch (e) {
        errorToast(e);
      }

      // } else if (isValid && userProp === "direccion") {
      //   await updateDoc(doc(firestore, "users", user.uid), {
      //     ["direccion.codigoPostal"]: inputCP,
      //     ["direccion.direccion"]: inputValue,
      //     ["direccion.localidad"]: inputLocalidad,
      //   });
      //   successToast("Actualizado correctamente");
      //   window.location.reload();
    } else {
      errorToast("Ingresa correctamente los datos");
    }
  };
  // validaciones de inputs
  useEffect(() => {
    if (userProp === "nombre" || userProp === "apellido") {
      !format.test(inputValue) ? setIsValid(true) : setIsValid(false);
    }
    if (userProp === "pais") {
      inputValue !== null ? setIsValid(true) : setIsValid(false);
    }
    if (userProp === "telefono") {
      inputValue !== null ? setIsValid(true) : setIsValid(false);
    }
    if (userProp === "fechaDeNacimiento") {
      inputValue !== (new Date() || null)
        ? setIsValid(true)
        : setIsValid(false);
    }
    if (userProp === "dni") {
      inputValue > 500000 && inputValue < 100000000
        ? setIsValid(true)
        : setIsValid(false);
    }
    // if (userProp === "direccion") {
    //   if (
    //     inputValue !== undefined &&
    //     inputValue.length > 1 &&
    //     inputLocalidad !== undefined &&
    //     inputLocalidad.length > 1 &&
    //     inputCP !== undefined &&
    //     inputCP.length > 1
    //   ) {
    //     setIsValid(true);
    //   } else {
    //     setIsValid(false);
    //   }
    // }
  }, [inputValue]);

  return (
    <Flex
      flexDir={["column", "row", "row", "row"]}
      p={1}
      minH={["24px", "24px", "24px", "46.2px"]}
      borderRadius="10px"
      border="1px solid black"
      mb={5}
      align={["justify", "justify", "center", "center"]}
      width="100%"
      justify="space-between"
      filter="auto"
      blur={!displayProp && !blurProp ? "4px" : "0px"}
      brightness={!displayProp && !blurProp ? "60%" : "none"}
    >
      {loadingUpdate ? (
        <Progress w="100%" size="xs" isIndeterminate />
      ) : (
        <>
          <Flex
            flexDir={isEmail ? ["column", "row", "row", "row"] : "flex"}
            w="100%"
          >
            <Flex w="50%">
              <Text m="auto" flexGrow={1} fontSize={["xs", "xs", "md", "md"]}>
                {title}:
              </Text>
            </Flex>
            <Flex w="50%">
              {!displayProp && (
                <Flex width="50%">
                  <Text fontSize={["xs", "xs", "md", "md"]}>
                    {(userRef && userRef[userProp]) || "Sin definir"}
                  </Text>
                </Flex>
              )}
              {displayProp && children}
            </Flex>
          </Flex>
          <Flex justify="flex-end">
            {!isEmail && (
              <Flex>
                {displayProp && (
                  <Flex gap={2} ml={2}>
                    <Flex>
                      <Icon
                        as={MdCheckCircle}
                        w="100%"
                        cursor="pointer"
                        color="green.600"
                        borderRadius="50%"
                        fontSize={35}
                        title="Aceptar"
                        _hover={{ bg: "gray.300" }}
                        onClick={onClickAceptar}
                      />
                    </Flex>
                    <Flex onClick={onClickBlur}>
                      <Icon
                        as={MdCancel}
                        title="Cancelar"
                        color="red.600"
                        cursor="pointer"
                        fontSize={35}
                        borderRadius="50%"
                        w="100%"
                        _hover={{ bg: "gray.300" }}
                        onClick={() => {
                          setDisplayProp(false);
                          setInputValue(null);
                        }}
                      />
                    </Flex>
                  </Flex>
                )}
                {!displayProp && (
                  <Flex onClick={blurProp ? onClickBlur : null}>
                    <Button
                      size={["xs", "xs", "sm", "sm"]}
                      boxShadow="0 1px 1px"
                      bg="gray.400"
                      onClick={blurProp ? () => setDisplayProp(true) : null}
                    >
                      Modificar
                    </Button>
                  </Flex>
                )}
              </Flex>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};
