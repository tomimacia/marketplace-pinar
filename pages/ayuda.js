import { Flex, ListItem, OrderedList, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Link from "next/link";

const ayuda = () => {
  const preguntasFrecuentes = [
    "¿Cómo puedo registrarme en el marketplace?",
    "¿Cómo puedo encontrar productos o vendedores específicos en el marketplace?",
    "¿Cómo puedo hacer una compra en el marketplace?",
    "¿Qué métodos de pago acepta el marketplace?",
    "¿Cómo puedo hacer seguimiento de mi compra?",
    "¿Cómo puedo cancelar mi compra o solicitar un reembolso?",
    "¿Qué hago si el producto que recibí está dañado o no coincide con la descripción del vendedor?",
    "¿Cómo puedo calificar al vendedor o dejar un comentario sobre mi experiencia de compra?",
    "¿Cómo puedo comunicarme con el vendedor o el equipo de soporte del marketplace?",
    "¿Qué medidas de seguridad toma el marketplace para proteger mis datos y mi privacidad?",
  ];
  return (
    <Layout headTitle="Ayuda" pageTitle="Ayuda">
      <OrderedList p={5} spacing={2}>
        {preguntasFrecuentes.map((p, i) => {
          return (
            <ListItem cursor='pointer' _hover={{color:'blackAlpha.400'}} fontWeight="bold" fontSize={20} key={i * 5}>
              {p}
            </ListItem>
          );
        })}
      </OrderedList>
      <Flex p={5} align='center'>
        <Text fontSize={20} fontWeight="bold">
          Tienes alguna otra consulta?
        </Text>
        <Link href="contact">
          <Text ml={3} _hover={{color:'blackAlpha.400'}} fontSize={20} cursor="pointer" fontWeight="bold">
            Contactanos!
          </Text>
        </Link>
      </Flex>
    </Layout>
  );
};

export default ayuda;
