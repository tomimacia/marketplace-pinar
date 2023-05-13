import { EmailIcon, Icon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";

import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { context } from "../contexts/userContext";
import { useCustomToast } from "../items/customHooks/useCustomToast";

const Contact = () => {
  const { userRef } = useContext(context);
  const { successToast, errorToast } = useCustomToast();
  const [form, setForm] = useState({
    email: "",
    motivo: "",
    consulta: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.motivo || !form.consulta) {
      errorToast("Completa todos los campos");
    } else successToast("Enviado correctamente");
  };
  return (
    <Layout hasTransition headTitle="Contacto" pageTitle="Contacto">
      <Box w="100%" align="center">
        <Stack
          borderRadius="10px"
          maxW="1500px"
          m={3}
          align="flex-start"
          bg={useColorModeValue("white", "gray.600")}
          fontWeight="bold"
          p={5}
          spacing={7}
          fontSize={18}
        >
          <Text fontSize="23px" alignSelf="center">
            Tienes consultas? Contáctanos!
          </Text>
          <FormControl
            borderRadius="10px"
            p={2}
            outline="none"
            border="1px solid #c7c7c7"
          >
            <FormLabel fontSize="20px">Email</FormLabel>
            <Input
              onChange={onChange}
              placeholder={userRef?.email || ""}
              name="email"
              type="email"
            />
            <FormHelperText textAlign="left" p={0}>
              No compartiremos tu email
            </FormHelperText>
            <FormLabel fontSize="20px"> Motivo</FormLabel>

            <Input
              placeholder="Problema con un producto, quiero ser vendedor..."
              onChange={onChange}
              name="motivo"
              type="text"
            />
            <FormLabel fontSize="20px">Dejanos tu consulta</FormLabel>
            <Textarea onChange={onChange} name="consulta" minH="250px" />
            <Button
              bg="blue.400"
              fontWeight="bold"
              minW="90px"
              _hover={{ bg: "blue.200" }}
              m={3}
              size="sm"
              onClick={onSubmit}
            >
              Enviar
            </Button>
          </FormControl>
          <Text color="gray.600">Seguinos en nuestras redes sociales!</Text>
          <Flex
            justify="space-between"
            w="100%"
            color="black"
            fontSize={22}
            pt={0}
          >
            <Flex gap={3} aria-label="social-media">
              <Link
                href="https://www.instagram.com/tomimacia"
                target="_blank"
                rel="noreferer noopener"
              >
                <Icon as={BsInstagram} _hover={{ opacity: 0.7 }} ml={5} />
              </Link>
              <Link
                href="https://www.twitter.com/tomimacia"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon
                  as={BsTwitter}
                  color="#00acee"
                  _hover={{ opacity: 0.7 }}
                  ml={5}
                />
              </Link>
            </Flex>

            <Flex>
              <Text
                fontSize="17px"
                color={useColorModeValue("gray.600", "white")}
              >
                Chatea con nosotros!
              </Text>
              <Link
                href="https://wa.me/541161685995"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon
                  as={BsWhatsapp}
                  color="green"
                  _hover={{ opacity: 0.7 }}
                  ml={5}
                />
              </Link>
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Contact;
