import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { modState } from "../../components/atoms/Modalatom";
import { ConfirmInput } from "../../components/forms/confirmUserDetails/ConfirmInput";
import { ConfirmSelect } from "../../components/forms/confirmUserDetails/ConfirmSelect";
import { WelcomeUser } from "../../components/forms/confirmUserDetails/WelcomeUser";
import { auth, firestore } from "../../firebase/clientApp";
import { useCustomToast } from "../../items/customHooks/useCustomToast";

const confirmUserDetails = () => {
  const setAuthModelState = useSetRecoilState(modState);
  const { colorMode, setColorMode } = useColorMode();
  const [user, loading, error] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const { errorToast, successToast } = useCustomToast();
  const [isOpen, setIsOpen] = useState("none");
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

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, []);

  useEffect(() => {
    setColorMode("light");
  }, [colorMode]);
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
  function todayDate(str) {
    return `${str.getDate()}/${str.getMonth() + 1}/${str.getYear() + 1900}`;
  }

  const confirmUser = async () => {
    await setDoc(doc(firestore, "users", user.uid), {
      nombre: form.Nombre,
      apellido: form.Apellido,
      fechaDeNacimiento: todayDate(selectedDate),
      email: user.email,
      dni: `${form.TipoDeDni} ${form.Dni}`,
      pais: form.Pais,
      telefono: form.Telefono ? `+${form.CodigoDeArea}-${form.Telefono}` : "",
      direccion: "",
      favoritos: [],
      deseaRecibirEmails: form.checkbox,
      fechaDeSuscripcion: new Date(),
    });
    updateProfile(user, { displayName: form.Nombre });
  };

  const format = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const handleSubmit = () => {
    if (format.test(form.Nombre) || format.test(form.Apellido))
      return errorToast("Nombre o apellido invalido");
    else if (!form.Pais || !selectedDate)
      return errorToast("Complete los datos obligatorios por favor");
    else {
      successToast("Regitrado correctamente");
      confirmUser();
      setAuthModelState(() => ({
        view: "login",
        open: false,
      }));
      setIsOpen("grid");
      sendEmailVerification(user);
    }
  };

  return (
    <Flex>
      <Flex
        alignItems="center"
        flexDir="column"
        minH="100vh"
        maxH="100%"
        w="100vw"
        bg="blue.300"
        p={[0, 10, 10, 10]}
      >
        <Heading m={10}>Datos del usuario</Heading>
        <Flex
          borderRadius={[0, "20px", "20px", "20px"]}
          border="5px solid black"
          alignItems="center"
          flexDir="column"
          width={["100%", "80%", "80%", "80%"]}
          bg="white"
          p={[0, 0, 0, 5]}
        >
          <Heading as="h2" size="sm" mb={3}>
            Bienvenido {!loading && user && (user?.displayName || user?.email)}!
          </Heading>
          <Heading as="h3" size="sm" mb={3}>
            Completa los datos para continuar
          </Heading>
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
            <Box maxW="183px" border="1px solid black">
              <DatePicker
                onChange={(date) => setSelectedDate(date)}
                selected={selectedDate}
                dateFormat="dd/MM/yyyy"
                name="date"
                scrollableYearDropdown
                showYearDropdown
                maxDate={new Date()}
                isClosable
              />
            </Box>
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
            <Checkbox
              border="1px black"
              name="checkbox"
              onChange={handleCheckbox}
            >
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
                Confirmar
              </Button>
              <Link href="/">
                <Button
                  m={3}
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
        </Flex>
      </Flex>
      <WelcomeUser user={user} display={isOpen} nombre={form.nombre} />
    </Flex>
  );
};

export default confirmUserDetails;
