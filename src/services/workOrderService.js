// services/workOrderService.js
import { db } from "../firebaseConfig";
import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";

export async function fetchWorkOrders() {
    const workOrders = [];
    const q = query(
        collection(db, "workOrders"),
        orderBy("dateCreated", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        workOrders.push({
            id: doc.id,
            category: data.category,
            dateCreated: data.dateCreated.toDate(), // Assuming dateCreated is a Timestamp
            description: data.description,
            laborHours: data.laborHours,
            location: data.location,
            price: data.price,
            status: data.status,
            subCategory: data.subCategory,
            workOrder: data.workOrder,
        });
    });
    return workOrders;
}

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
