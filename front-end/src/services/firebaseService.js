import FireBase from "../utils/FirebaseConfigs";
import {collection, getDocs, addDoc} from "firebase/firestore";
const getFirebaseData = (collectionName) => {
    return getDocs(collection(FireBase, collectionName));
};
const saveFirebaseData = async (data, collectionName) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(FireBase, collectionName), data);
    console.log("New Record Created in Firebase DB: ", docRef.id);
};
export default { getFirebaseData, saveFirebaseData }