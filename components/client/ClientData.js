import { Box, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { UserDataListItem } from "./UserDataListItem";
import {ConfirmDate} from "../forms/confirmUserDetails/ConfirmDate"
export const ClientData = ({ userRef }) => {
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
  return (
    <Box>
      <UserDataListItem
        blurProp={blur}
        userProp="email"
        isEmail
        title="Email:"
      />
      <UserDataListItem
        onClickBlur={clickBlur}
        setInputValue={setInputValue}
        blurProp={blur}
        inputValue={inputValue}
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
        inputValue={inputValue}
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
        inputValue={inputValue}
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
        inputValue={inputValue}
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
          inputValue &&
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
        onClickBlur={clickBlur}
        blurProp={blur}
        setInputValue={setInputValue}
        inputValue={inputValue}
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
      {/* To set Adress for shipping */}
      {/* <UserDataListItem
        onClickBlur={clickBlur}
        inputValue={inputValue}
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
      </UserDataListItem> */}
    </Box>
  );
};


