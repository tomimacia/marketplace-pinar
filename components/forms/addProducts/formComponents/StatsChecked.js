import {
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";

export const StatsChecked = ({ stats, deleteStat, isOtros }) => {
  if (stats.length)
    return (
      <Flex mt={5} border="1px solid #c7c7c7" borderRadius="8px">
        <TableContainer w="100%">
          <Table size="xl" variant="simple">
            <Tbody>
              {stats.map((stat, i) => {
                return (
                  <Tr key={i}>
                    <Td
                      w="50%"
                      bg={i % 2 === 0 && "#c0cbff"}
                      borderRadius="5px"
                    >
                      {stat.Propiedad}
                    </Td>
                    {!isOtros && <Td w="50%"> : {stat.Valor}</Td>}
                    {isOtros && <Td w="50%"> : {stat.Valor ? "Si" : "No"}</Td>}
                    <Td>
                      <Icon
                        as={AiOutlineMinusCircle}
                        cursor="pointer"                        
                        fontSize="30px"
                        borderRadius="10px"
                        _hover={{ color: "blue.200" }}
                        onClick={()=>deleteStat(i)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    );
};
