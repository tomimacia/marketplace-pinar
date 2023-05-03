import { Button, FormControl, Progress } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AddCaracteristics,
  AddCategories,
  AddDescription,
  AddImages,
  AddMarcas,
  AddModelos,
  AddOtros,
  AddPrice,
  AddSubCat,
  AddTitle,
} from "../../../components/forms/addProducts/ExportAllFields";
import { context } from "../../../contexts/userContext";
import { auth } from "../../../firebase/clientApp";
import { addSingleDoc } from "../../../firebase/services/addSingleDoc";
import { loadFile } from "../../../firebase/services/loadFIle";
import { useCustomToast } from "../../../items/customHooks/useCustomToast";
import { prepareSearchValue } from "./helpers/prepareSearchValue";

export const AddProductsForm = () => {
  const [user] = useAuthState(auth); 
  const ctx = useContext(context);
  const [formKey, setFormKey] = useState(10);
  const [loading, setLoading] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const formInitialvalue = {
    Categoria: "",
    SubCat1: "",
    Marca: "Otro",
    Modelo: "Otro",
    Images: [],
    Caracteristicas: [],
    Otros: [],
  };
  const [form, setForm] = useState(formInitialvalue);  
  // Input refs to get the value from some input fields,
  // improved perfomance against setForm state
  const tituloRef = useRef();
  const descripcionRef = useRef();
  const precioRef = useRef();

  const confirmProduct = async (images) => {
    try {
      await addSingleDoc("Productos", {
        Nombre: tituloRef.current.value,
        Categoria: form.Categoria,
        SubCat1: form.SubCat1,
        Precio: parseInt(precioRef.current.value),
        Img: [...images],
        Marca: form.Marca,
        Modelo: form.Modelo,
        Descripcion: descripcionRef.current.value,
        UserID: user.uid,
        SearchValues: prepareSearchValue(tituloRef.current.value),
        Vendedor: ctx.sellerName,
        Caracteristicas: form.Caracteristicas,
        Otros: form.Otros,
      });
    } catch (e) {
      alert(e.message);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = async () => {
    if (
      !tituloRef.current.value ||
      !precioRef.current.value ||
      !form.Categoria ||
      !form.SubCat1
    ) {
      errorToast("Completa todos obligatorios los campos por favor");
      return false;
    } else if (!form.Images.length) {
      errorToast("Adjunta una imagen");
      return false;
    }
    setLoading(true);
    try {
      await Promise.all(
        form.Images.map((img) =>
          loadFile(img, user.uid, tituloRef.current.value)
        )
      ).then((res) => {
        confirmProduct(res);
      });
    } catch (e) {
      alert("Error al cargar el producto");
    } finally {
      setLoading(false);
      successToast("Producto agregado correctamente");
      setFormKey((prev) => prev + 1);
    }
  };

  return (
    <FormControl
      key={formKey}
      maxW="1500px"
      m="auto"
      borderRadius="10px"
      p={2}
      border="1px solid black"
    >
      <AddTitle inputValueRef={tituloRef} />
      <AddCategories onChange={onChange} setForm={setForm} />
      {form.Categoria && (
        <>
          <AddSubCat            
            onChange={onChange}
            catToUpdate={form.Categoria}
          />
        </>
      )}
      {form.SubCat1 && (
        <>
          <AddMarcas            
            onChange={onChange}
            catToUpdate={form.Categoria}
          />
          <AddModelos            
            onChange={onChange}
            catToUpdate={form.Categoria}
          />
        </>
      )}
      <AddPrice inputValueRef={precioRef} />
      <AddImages setForm={setForm} />
      <AddDescription inputValueRef={descripcionRef} />
      <AddCaracteristics setForm={setForm} />
      <AddOtros setForm={setForm} />
      <Button
        bgColor="blue.400"
        _hover={{ bgColor: "blue.200" }}
        mt={5}
        type="submit"
        onClick={onSubmit}
      >
        Agregar Producto
      </Button>
      {loading && <Progress m="22px" size="xs" isIndeterminate />}
    </FormControl>
  );
};
