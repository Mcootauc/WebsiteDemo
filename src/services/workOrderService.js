import { db } from '../firebaseConfig';
import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    query,
    orderBy,
    limit,
} from 'firebase/firestore';

// Formats dates
function formatDate(timestamp) {
    const date = timestamp.toDate();
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
    });
    const formattedDate = formatter.format(date);

    return formattedDate;
}

// Fetches the latest work order ID
export async function fetchLatestWorkOrderId() {
    const q = query(
        collection(db, 'workOrders'),
        orderBy('workOrder', 'desc'),
        limit(1)
    );
    const querySnapshot = await getDocs(q);
    let highestId = 0;
    querySnapshot.forEach((doc) => {
        highestId = doc.data().workOrder;
    });
    return highestId;
}

export async function fetchWorkOrders() {
    const workOrders = [];
    const q = query(
        collection(db, 'workOrders'),
        orderBy('dateCreated', 'desc')
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        workOrders.push({
            id: doc.id,
            category: data.category,
            dateCreated: formatDate(data.dateCreated),
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
        dateCreated: Timestamp.now(),
    };
    try {
        const docRef = await addDoc(collection(db, 'workOrders'), data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error('Error adding document: ', error);
        throw new Error('Failed to create work order');
    }
}
