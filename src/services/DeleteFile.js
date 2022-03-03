import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

// 'file' comes from the Blob or File API
const DeleteFile = async (path, filename) => {
  try {
    const storageRef = ref(storage, `${path}/${filename}`);
    const res = await deleteObject(storageRef);
    console.log("DELETE FILE SUCCES : ", res);
  } catch (error) {
    console.log("error DELETE File: ", error);
    throw error;
  }
};

export default DeleteFile;
