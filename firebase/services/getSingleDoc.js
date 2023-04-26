import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../clientApp";

export const getSingleDoc = async (collection, param) => {
  const usuario = await getDoc(doc(firestore, collection, param));
  return usuario;
};
