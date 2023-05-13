import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useContext, useState } from "react";
import { useSetRecoilState } from "recoil";
import { context } from "../../../contexts/userContext";
import { auth, firestore } from "../../../firebase/clientApp";
import { useCustomToast } from "../../../items/customHooks/useCustomToast";
import { modState } from "../../atoms/Modalatom";
import { ConfirmDate } from "./ConfirmDate";
import { ConfirmInput } from "./ConfirmInput";
import { ConfirmSelect } from "./ConfirmSelect";

export const ConfirmUserForm = ({ user, setOpenWelcome }) => {
  const setAuthModelState = useSetRecoilState(modState);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { updateUser } = useContext(context);
  const [selectedDate, setSelectedDate] = useState(null);
  const { errorToast, successToast } = useCustomToast();
  const [form, setForm] = useState({
    Nombre: "",
    Apellido: "",
    Dni: "",
    TipoDeDni: "",
    Pais: "",
    CodigoDeArea: "",
    Telefono: "",
    checkbox: false,
  });
  const handleCheckbox = () => {
    setForm({ ...form, checkbox: !form.checkbox });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirmUser = async () => {
    await setDoc(doc(firestore, "users", user.uid), {
      nombre: form.Nombre,
      apellido: form.Apellido,
      fechaDeNacimiento: `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`,
      email: user.email,
      dni: `${form.TipoDeDni} ${form.Dni}`,
      pais: form.Pais,
      telefono: form.Telefono ? `+${form.CodigoDeArea}-${form.Telefono}` : "",
      direccion: "",
      favoritos: [],
      deseaRecibirEmails: form.checkbox,
      fechaDeSuscripcion: new Date(),
    });
  };

  const format = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const handleSubmit = async () => {
    if (format.test(form.Nombre) || format.test(form.Apellido))
      return errorToast("Nombre o apellido invalido");
    else if (!form.Pais || !selectedDate)
      return errorToast("Complete los datos obligatorios por favor");
    else {
      setConfirmLoading(true);
      await confirmUser();
      await updateUser();
      updateProfile(user, { displayName: form.Nombre });
      user?.providerData[0].providerId !== "google.com" &&
        sendEmailVerification(user);
      successToast("Regitrado correctamente");
      setAuthModelState(() => ({
        view: "login",
        open: false,
      }));
      setOpenWelcome(true);
      setConfirmLoading(false);
    }
  };

  return (
    <FormControl
      p={5}
      border="1px solid black"
      maxH="100%"
      w={["100%", "100%", "100%", "70%"]}
    >
      <ConfirmInput
        title="Nombre"
        isRequired
        type="text"
        onChange={onChange}
        placeholder="Ingrese su nombre completo"
      />
      <ConfirmInput
        title="Apellido"
        type="text"
        isRequired
        onChange={onChange}
        placeholder="Ingrese su apellido"
      />
      <FormLabel>Fecha de nacimiento *</FormLabel>
      <ConfirmDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ConfirmSelect
        title="Pais"
        customTitle="Pais *"
        onChange={onChange}
        placeholder="Seleccionar pais"
        options={[
          "Argentina",
          "Uruguay",
          "Paraguay",
          "Chile",
          "Bolivia",
          "Brasil",
          "Peru",
          "Colombia",
        ]}
      />
      <ConfirmInput
        title="Dni"
        type="number"
        onChange={onChange}
        placeholder="Ingrese su DNI"
      />
      <ConfirmSelect
        customTitle="Tipo de DNI"
        title="TipoDeDni"
        onChange={onChange}
        placeholder="Tipo de DNI"
        options={[
          "Cédula de identidad",
          "Libreta de Enrolamiento",
          "DNI",
          "Libreta Cívica",
          "Otro",
        ]}
      />
      <ConfirmInput
        title="CodigoDeArea"
        type="number"
        onChange={onChange}
        placeholder="Ej: 54"
      />
      <ConfirmInput
        title="Telefono"
        type="number"
        onChange={onChange}
        placeholder="Ej: 1141414141"
      />
      {/* activar para terminos y condiciones
            <Checkbox defaultChecked>
            <Text>Acepto los terminos y condiciones</Text>
          </Checkbox> */}
      <Checkbox border="1px black" name="checkbox" onChange={handleCheckbox}>
        <Text>Deseo recibir ofertas e informacion por email</Text>
      </Checkbox>
      <FormHelperText>* Campos requeridos</FormHelperText>
      <FormHelperText>
        La informacion es solo para el uso de la aplicacion.
      </FormHelperText>
      <FormHelperText>
        No compartiremos esta informacion con nadie.
      </FormHelperText>
      <Flex flexDir="column" p={5} align="center" width="100%">
        <Button
          _hover={{ bg: "blue.200" }}
          fontSize="15px"
          fontWeight="bold"
          w={["100%", "90%", "80%", "70%"]}
          size={["xs", "xs", "sm", "sm"]}
          bg="blue.400"
          type="submit"
          m={3}
          onClick={handleSubmit}
        >
          {confirmLoading ? <Spinner /> : "Confirmar"}
        </Button>
        <Link href="/">
          <Button
            m={3}
            disabled={confirmLoading}
            w={["100%", "90%", "80%", "70%"]}
            fontSize="15px"
            fontWeight="bold"
            size={["xs", "xs", "sm", "sm"]}
            bg="gray.300"
            onClick={() => signOut(auth)}
          >
            Cerrar y volver al Inicio
          </Button>
        </Link>
      </Flex>
    </FormControl>
  );
};
