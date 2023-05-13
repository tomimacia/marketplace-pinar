import { useState } from "react";
import { Box, Flex, Input, Select } from "@chakra-ui/react";
import { UserDataListItem } from "./userDataListItem";
import { ConfirmDate } from "../components/forms/confirmUserDetails/ConfirmDate";
const ClientData = ({ userRef }) => {
  const [inputValue, setInputValue] = useState(null);
  const [blur, setBlur] = useState(true);
  const clickBlur = () => {
    setBlur(!blur);
  };
  const paises = [
    "Argentina",
    "Uruguay",
    "Paraguay",
    "Chile",
    "Brasil",
    "Bolivia",
    "Peru",
    "Colombia",
  ];
  console.log(inputValue)
  return (
    <Box>
      <UserDataListItem
        blurProp={blur}
        userProp="email"
        isEmail
        title="Email:"
      ></UserDataListItem>
      <UserDataListItem
        onClickBlur={clickBlur}
        setInputValue={setInputValue}
        blurProp={blur}
        title="Nombre"
        userProp="nombre"
      >
        <Input
          borderColor="blackAlpha.500"
          onChange={(e) => setInputValue(e.target.value)}
          bg="white"
          color="black"
          m="auto"
          type="text"
          size={["xs", "xs", "sm", "sm"]}
        />
      </UserDataListItem>
      <UserDataListItem
        onClickBlur={clickBlur}
        setInputValue={setInputValue}
        blurProp={blur}
        title="Apellido"
        userProp="apellido"
      >
        <Input
          borderColor="blackAlpha.500"
          onChange={(e) => setInputValue(e.target.value)}
          bg="white"
          color="black"
          m="auto"
          type="text"
          size={["xs", "xs", "sm", "sm"]}
        />
      </UserDataListItem>
      <UserDataListItem
        onClickBlur={clickBlur}
        setInputValue={setInputValue}
        blurProp={blur}
        title="Nacionalidad"
        userProp="pais"
      >
        <Select
          name="pais"
          size={["xs", "xs", "sm", "sm"]}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Seleccionar pais"
        >
          {paises.map((pais) => {
            return <option key={pais}>{pais}</option>;
          })}
        </Select>
      </UserDataListItem>
      <UserDataListItem
        setInputValue={setInputValue}
        onClickBlur={clickBlur}
        blurProp={blur}
        title="Telefono"
        userProp="telefono"
      >
        <Input
          borderColor="blackAlpha.500"
          onChange={(e) => setInputValue(e.target.value)}
          bg="white"
          color="black"
          m="auto"
          type="number"
          size={["xs", "xs", "sm", "sm"]}
        />
      </UserDataListItem>
      <UserDataListItem
        onClickBlur={clickBlur}
        setInputValue={setInputValue}
        blurProp={blur}
        inputValue={
          inputValue?.day + "-" + inputValue?.month + "-" + inputValue?.year
        }
        title="Nacimiento"
        userProp="fechaDeNacimiento"
      >
        <ConfirmDate
          selectedDate={inputValue}
          setSelectedDate={setInputValue}
        />
      </UserDataListItem>
      <UserDataListItem
        onClickBlur={() => setBlur(!blur)}
        blurProp={blur}
        setInputValue={setInputValue}
        title="Dni"
        userProp="dni"
      >
        <Input
          borderColor="blackAlpha.500"
          onChange={(e) => setInputValue(e.target.value)}
          bg="white"
          color="black"
          m="auto"
          type="number"
          size={["xs", "xs", "sm", "sm"]}
        />
      </UserDataListItem>
      <UserDataListItem
        onClickBlur={() => setBlur(!blur)}
        blurProp={blur}
        title={
          <>
            Direccion:
            <br /> Localidad:
            <br /> Codigo Postal
          </>
        }
        userProp="direccion"
      >
        <Flex flexDir="column">
          <Input
            borderColor="blackAlpha.500"
            bg="white"
            color="black"
            size="xs"
          />
          <Input
            mt={1}
            mb={1}
            borderColor="blackAlpha.500"
            bg="white"
            color="black"
            size="xs"
          />
          <Input
            borderColor="blackAlpha.500"
            bg="white"
            color="black"
            size="xs"
          />
        </Flex>
      </UserDataListItem>
    </Box>
  );
};

export default ClientData;
