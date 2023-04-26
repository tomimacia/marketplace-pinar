import { Flex, Heading, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";

export const Stats = ({stats,isOtros}) => {
  return (
    <Flex mt={10} flexDir='column'>
      <Heading size={["sm","sm","md","md"]}>{!isOtros ? "Caracteristicas" : "Otros"}</Heading>
      <Flex mt={3} borderRadius="5px" minH="100px" p={2}>
        <Flex
          w="100%"
          m={[0, 0, 2, 5]}
          border="1px solid #c7c7c7"
          borderRadius="8px"
        >
          <TableContainer w="100%">
            <Table size={["xs","xs","sm","sm"]} variant="simple">
              <Tbody fontSize={['sm','sm',"md","md"]}
                        fontWeight={["none","none","bold","bold"]}>
                {stats.map((otro, i) => {
                  return (
                    <Tr key={i}>
                      <Td                        
                        bg={i % 2 === 0 && "#c0cbff"}
                        borderRadius="5px"
                        
                      >
                        {otro.Propiedad}
                      </Td>
                      <Td w="48%"> {!isOtros ? otro.Valor : (otro.Valor ? "Si" : "No")}</Td>
                      
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};
