import { Box, Flex, ListItem, OrderedList, Text } from "@chakra-ui/react";
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
  const respuestas = [
    ["En el boton de registrar"],
    ["Con la barra de busqueda"],
    [
      "Selecciona los productos deseados, añadiendolos al carro, y dirigite al mismo la esquina superior derecha de la pantalla para confirmar tu compra.",
    ],
    [
      "Por el momento mercadopago, o transferencia bancaria con un 10% de descuento.",
    ],
    [
      "Tras realizar la compra se otorga un numero de compra, y puedes consultar con el vendedor por la misma.",
    ],
    [
      "Dependiendo del vendedor o del producto se podra solocitar un reembolso en la sección 'Mis Compras'",
    ],
    [
      "En el caso de que un producto este dañado o no coincida se inicia un reclamo, adjuntando las pruebas correspondientes, y de corresponder se realiza un reembolso.",
    ],
    ["Actualmente no contamos con una calificación de vendedor."],
    [
      "En la sección de contacto, al final de la lista tienes un link a dicha sección para contactarnos!",
    ],
    [
      "Marketplace esta construido Firebase, la base de datos de goodle, la cual es robusta en materia de seguridad, y con la autenticación de google brindamos la mejor seguridad para nuestros usuarios.",
    ],
  ];
  return (
    <Layout headTitle="Ayuda" pageTitle="Ayuda">
      <Flex  flexDir='column' w='100%' align='center'>
        <OrderedList bg='whiteAlpha.500' w={["100%","100%","90%","80%"]} p={5} spacing={2}>
          {preguntasFrecuentes.map((p, i) => {
            return (
              <Box>
                <ListItem
                  cursor="pointer"                  
                  fontWeight="bold"
                  fontSize={20}
                  key={i * 5}
                >
                  {p}
                </ListItem>
                <Text fontSize={18} fontWeight="bold">
                  {respuestas[i]}
                </Text>
              </Box>
            );
          })}
        </OrderedList>
        <Flex p={5} align="center">
          <Text fontSize={20} fontWeight="bold">
            Tienes alguna otra consulta?
          </Text>
          <Link href="contact">
            <Text
              ml={3}
              _hover={{ color: "blackAlpha.400" }}
              fontSize={20}
              cursor="pointer"
              fontWeight="bold"
            >
              Contactanos!
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ayuda;
