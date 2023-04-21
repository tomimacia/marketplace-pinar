import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../clientApp";


export const getMultipleDocs = async ({paramCollection}) => {
  const collectionRef = collection(firestore, paramCollection);

    const data = await getDocs(collectionRef);
    const dataWithId = data.docs.map((element) => ({
      ...element.data(),
      id: element.id,
    }));
    return dataWithId
}