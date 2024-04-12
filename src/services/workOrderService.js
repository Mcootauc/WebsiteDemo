// services/workOrderService.js
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function createWorkOrder(formData) {
    const data = {
        ...formData,
        dateCreated: Timestamp.now(), // Captures the creation timestamp
    };
    try {
        const docRef = await addDoc(collection(db, "workOrders"), data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding document: ", error);
        throw new Error("Failed to create work order");
    }
}
