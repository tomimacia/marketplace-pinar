import {
  Flex,
  FormLabel,
  Icon,
  Input,
  Stat,
  StatHelpText,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { StatsChecked } from "./StatsChecked";
import { useEnter } from "../../../../items/customHooks/useEnter";

export const AddStats = ({ title,setForm }) => {
  const toast = useToast();
  const [stats, setStats] = useState([]);
  const [prop, setProp] = useState("");
  const [value, setValue] = useState(false);
  const propRef = useRef();
  const valueRef = useRef();
  const isOtros = title === "Otros";
  const addCaracterística = (e) => {
    if (!prop) {
      return toast({
        title: `Completa propiedad y valor`,
        status: "error",
        isClosable: true,
      });
    }
    if (!isOtros && !value) {
      return toast({
        title: `Completa propiedad y valor`,
        status: "error",
        isClosable: true,
      });
    }
    setStats((prev) => [...prev, { Propiedad: prop, Valor: value }]);
    setProp("");
    setValue(false);
    
    propRef.current.value = "";
    if (!isOtros) valueRef.current.value = "";
    propRef.current.focus();
  };
  const deleteStat = (ind) => {
    const newStats = stats.filter((_, i) => i !== ind);
    setStats(newStats);    
  };
  useEffect(()=>{
    setForm((prev) => ({
      ...prev,
      [title]: stats,
    }));
  },[stats])

  return (
    <>
      <FormLabel mt={5}>{title}</FormLabel>
      <Stat>
        {!isOtros ? (
          <StatHelpText fontSize="15px">
            Por cada carateristica ingresar "Propiedad" y "Valor", por ejemplo:
            "Peso" : "*** grs", "Sabor" : "vainilla"...
          </StatHelpText>
        ) : (
          <StatHelpText fontSize="15px">
            Otras carateristicas, con valor si o no, por ejemplo: "Apto para
            microondas":"No", "Es sumergible":"Si"...
          </StatHelpText>
        )}
      </Stat>
      <Flex m={1} flexDir="column">
        <Flex w="100%">
          <FormLabel w="50%" m={1} flexGrow={1} fontSize="14px">
            Propiedad
          </FormLabel>
          <FormLabel w="50%" m={1} flexGrow={1} fontSize="14px">
            Valor
          </FormLabel>
        </Flex>

        <Flex align="center">
          <Flex w="50%">
            <Input
              onChange={(e) => setProp(e.target.value)}
              borderRadius="none"
              ref={propRef}
              name="PropiedadC"
              size="sm"
              m={1}
              borderColor="black"
            />
          </Flex>
          <Text fontSize="25px">:</Text>
          <Flex w="50%">
            {!isOtros ? (
              <Input
                onChange={(e) => setValue(e.target.value)}
                size="sm"
                ref={valueRef}
                onKeyDown={useEnter(valueRef.current, addCaracterística)}
                name="ValorC"
                borderRadius="none"
                m={1}
                borderColor="black"
              />
            ) : (
              <Flex flexGrow={1} align="center">
                <Flex
                  flexGrow={7}
                  border={`1px solid ${value ? "green" : "red"}`}
                  align="center"
                  justify="center"
                  h="32px"
                  ml={2}
                  borderRadius="15px"
                >
                  <Text justifyContent="center" color={value ? "green" : "red"}>
                    {value ? "Si" : "No"}
                  </Text>
                  <Icon as={value ? FcCheckmark : FcCancel} />
                </Flex>
                <Flex align="center" justify="space-evenly" flexGrow={3}>
                  <Switch
                    isChecked={value}
                    name="ValorO"
                    onChange={() => setValue((prev) => !prev)}
                    size="md"
                  />
                </Flex>
              </Flex>
            )}
          </Flex>

          <Icon
            as={AiOutlinePlusCircle}
            cursor="pointer"
            fontSize="30px"
            borderRadius="10px"
            _hover={{ color: "#c7c7c7" }}
            onClick={addCaracterística}
          />
        </Flex>
        <StatsChecked isOtros={isOtros} stats={stats} deleteStat={deleteStat} />
      </Flex>
    </>
  );
};
