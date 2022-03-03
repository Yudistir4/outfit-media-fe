import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage();

// 'file' comes from the Blob or File API
const UploadFile = async (file, path) => {
  try {
    let filename = file.name;
    let ektensi =
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
      filename;

    filename = `${uuidv4()}.${ektensi}`;
    console.log("NEW FILENAME : ", filename);

    const storageRef = ref(storage, `${path}/${filename}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log("URL :", url);

    return { filename, url };
  } catch (error) {
    console.log("error Upload File: ", error);
    throw error;
  }
};

export default UploadFile;
