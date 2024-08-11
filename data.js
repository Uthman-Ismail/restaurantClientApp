import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { db } from "./firestore.config";



export const addOrder = async (orderNum, id, tableId, price) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    let amount = 0;
    const neededTime = `${hours}-${minutes}-${seconds}`;
    const table = tableId.toString();
    
    try {
        const orderRef = doc(db, "order", table);
        const docSnap = await getDoc(orderRef);

        if (docSnap.exists()) {
            // Document exists, get the existing orders
            const existingOrders = docSnap.data().orders || [];

            // Add the new order with the initial time
            const newOrder = {
                title: id,
                order: orderNum,
                time: neededTime,
            };
            existingOrders.push(newOrder);

            // Update the document with the new order array
            await updateDoc(orderRef, {
                amount: amount + price,
                orders: existingOrders
            });

            console.log("Order added to existing document with ID: ", table);
        } else {
            // Document does not exist, create a new document
            let firstTime = neededTime;
            const initialOrder = {
                title: id,
                order: orderNum,
                time: neededTime,
            };

            await setDoc(orderRef, {
                tableId: table,
                firstOrder: firstTime,
                status: "pending",
                employeeId: "undefined",
                amount: amount + price,
                orders: [initialOrder]
            });

            console.log("New document created with ID: ", table);
        }
    } catch (e) {
        console.error("Error adding or updating document: ", e);
    }
};


export const globalColor = {
    white: 'white',
    backGroundLight: '#A788EA',
    backGroundDark: '#5E4D84',
    buttomButtonHome: '#8A3ABB',
    black: 'black',
    header: '#533299',
    amount: '#D9D9D9',
    button: '#4E29B9',
    rate: '#D9D9D9'
}

export const alternativeColor = {
    white: 'white',
    backGroundLight: '#D31CB6',
    backGroundDark: '#F2AFF8',
    buttomButtonHome: '#8A3ABB',
    black: 'black',
    header: '#FFCE57',
    amount: '#D9D9D9',
    button: '#FF2942',
    rate: '#D9D9D9'
}
