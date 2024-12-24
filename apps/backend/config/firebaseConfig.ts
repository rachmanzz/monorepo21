import admin from "firebase-admin"
import {getFirestore} from "firebase-admin/firestore"

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

export const db = getFirestore();
export default admin




