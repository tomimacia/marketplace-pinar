import { Flex, FormLabel, Progress, Select, Text } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../../../../firebase/clientApp";
import { useCategories } from "../../../../items/customHooks/useCategories";
import { AddPrdInput } from "../formComponents/AddPrdInput";
import { useCustomToast } from "../../../../items/customHooks/useCustomToast";
export const AddCategories = ({ setForm, onChange }) => {
  const { categories, setCategories } = useCategories();
  const [addState, setAddState] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { errorToast, successToast } = useCustomToast();

  const checkAddValue = (str) => {
    if (str[0].toUpperCase() !== str[0]) {
      errorToast("Debe comenzar con mayúscula");
      return false;
    }
    return true;
  };
  const onClickUpdate = async () => {
    if (!addValue) return errorToast("Rellena el campo");
    if (checkAddValue(addValue)) {
      setIsLoading(true);
      await setDoc(doc(firestore, "Categorias", addValue), {
        Marcas: [],
        Modelos: [],
        SubCat1: [],
      });
      setCategories((prev) => [
        ...prev,
        {
          ["id"]: addValue,
          Marcas: [],
          Modelos: [],
          SubCat1: [],
        },
      ]);
      setAddState(false);
      setIsLoading(false);
      successToast("Actualizado correctamente");
    }
  };
  
  return (
    <>
      <FormLabel>Categoria *</FormLabel>
      {addState ? (
        isLoading ? (
          <Progress m="22px" size="xs" isIndeterminate />
        ) : (
          <AddPrdInput
            onChangeValue={(e) => setAddValue(e.target.value)}
            placeHolder={`Agregar nueva categoria`}
            onClickCancelar={() => setAddState((prev) => !prev)}
            onClickAceptar={onClickUpdate}
          />
        )
      ) : (
        <Select
          name="Categoria"
          onChange={(e) => {
            onChange(e);
            setForm((prev) => ({
              ...prev,
              SubCat1: "",
              Marca: "",
              Modelo: "",
            }));
          }}
          placeholder="Selecciona la categoria"
          borderColor="1px solid black"
        >
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.id}
              </option>
            );
          })}
        </Select>
      )}

      {!addState && (
        <Flex>
          <Text
            textDecor="underline"
            ml={1}
            _hover={{ color: "blue.600" }}
            cursor="pointer"
            onClick={() => setAddState((prev) => !prev)}
          >
            Agregar categoria
          </Text>
        </Flex>
      )}
    </>
  );
};
