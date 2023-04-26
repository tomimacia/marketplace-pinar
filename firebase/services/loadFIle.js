import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../clientApp";
export const loadFile = async (file, userID, title) => {
  const storageRef = ref(
    storage,
    `${userID}/publicacion-${title}/${v4() + "--fileName--" + file.name}`
  );
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    alert(error.message);
  }
};
