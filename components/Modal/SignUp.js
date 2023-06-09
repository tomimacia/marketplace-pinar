import { Button, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { auth } from "../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../firebase/errors";
import { modState } from "../atoms/Modalatom";
import { useRouter } from "next/router";

const SignUp = () => {
  const setAuthModelState = useSetRecoilState(modState);
  const router = useRouter();
  const [error, setError] = useState();
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signUpForm, setsignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (error) setError("");
    if (
      signUpForm.email !== signUpForm.confirmEmail ||
      signUpForm.password !== signUpForm.confirmPassword
    ) {
      setError("Email o contraseña no coinciden");
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        signUpForm.email,
        signUpForm.password
      );
      router.push("/clientPages/ConfirmUserDetails");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setsignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        color='black'
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        color='black'
        name="confirmEmail"
        placeholder="Confirmar Email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        color='black'
        name="password"
        placeholder="Contraseña"
        type="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        color='black'
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        type="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.500",
        }}
        bg="gray.50"
      />
      {(error || userError) && (
        <Text textAlign="center" fontSize="10pt" color="red">
          {error || FIREBASE_ERRORS[userError.message]}
        </Text>
      )}
      <Text
        display={user ? "flex" : "none"}
        textAlign="center"
        justifyContent="center"
        fontSize="10pt"
        color="green"
      >
        Registrado Correctamente
      </Text>
      <Button
        type="submit"
        w="100%"
        h="36px"
        mt={2}
        mb={2}
        bg="blue.500"
        color="white"
        _hover={{ bg: "blue.400" }}
        border={useColorModeValue("1px solid","none")}
        borderRadius="60px"
        fontSize="10pt"
        fontWeight="700"
        _focus={{ boxShadow: "none" }}
        isLoading={loading}
      >
        Regsitrarme
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Ya estas registrado?</Text>
        <Text
          color="blue.500"
          fontWeight="700"
          cursor="pointer"
          onClick={() => {
            setAuthModelState((prev) => ({ ...prev, view: "login" }));
          }}
        >
          INICIAR SESION
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;
