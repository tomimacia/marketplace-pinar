import { Flex, FormLabel, Progress, Select, Text } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../../firebase/clientApp";
import { useCustomToast } from "../../../../items/customHooks/useCustomToast";
import { AddPrdInput } from "./AddPrdInput";
import { useCategories } from "../../../../items/customHooks/useCategories";

export const AddSelect = ({
  isRequired,
  onChange,
  placeHolder,
  title,
  prop,
  catToUpdate,
}) => {
  const [addState, setAddState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errorToast, successToast } = useCustomToast();

  const { setCategories, getField } = useCategories();
  const initialFieldGroup = (prop, catToUpdate) => {
    const { getModelos, getMarcas, getSubcategories } = getField;
    switch (prop) {
      case "Modelos":
        return getModelos(catToUpdate);
      case "Marcas":
        return getMarcas(catToUpdate);
      case "SubCat1":
        return getSubcategories(catToUpdate);
    }
  };
  const [fieldGroup, setFieldGroup] = useState([]);
  const [addValue, setAddValue] = useState("");
  useEffect(() => {
    setFieldGroup(initialFieldGroup(prop, catToUpdate));
  }, [catToUpdate]);
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
      try {
        await updateDoc(doc(firestore, "Categorias", catToUpdate), {
          [prop]: [...fieldGroup, addValue],
        });
        // update categories session storage in case of reload
        setCategories((prev) => {
          const newCategories = prev.map((cat) => {
            if (cat.id === catToUpdate) {
              return { ...cat, [prop]: [...fieldGroup, addValue] };
            }
            return cat;
          });
          return [...newCategories];
        });
        //update local state to use new value without reload
        setFieldGroup((prev) => [...prev, addValue]);
        successToast("Actualizado correctamente");
      } catch (e) {
        errorToast("Error en la subida de datos");
        console.log(e);
      } finally {
        setAddState(false);
        setIsLoading(false);
      }
    }
  };
  if (fieldGroup?.length)
    return (
      <div>
        <FormLabel>{`${title} ${isRequired ? "*" : " "}`}</FormLabel>
        {addState ? (
          isLoading ? (
            <Progress m="22px" size="xs" isIndeterminate />
          ) : (
            <AddPrdInput
              onChangeValue={(e) => setAddValue(e.target.value)}
              placeHolder={`Agregar ${
                title === "Modelo" ? "nuevo" : "nueva"
              } ${title}`}
              onClickCancelar={() => setAddState((prev) => !prev)}
              onClickAceptar={onClickUpdate}
            />
          )
        ) : (
          <Select
            name={prop}
            onChange={onChange}
            placeholder={placeHolder}
            borderColor="1px solid black"
          >
            {fieldGroup.map((elem) => {
              return (
                <option key={elem} value={elem}>
                  {elem}
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
            >{`Agregar ${title.toLowerCase()}`}</Text>
          </Flex>
        )}
      </div>
    );
};
