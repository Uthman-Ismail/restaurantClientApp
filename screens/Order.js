import { Text, View, StyleSheet } from "react-native";
import { getDocs, collection, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firestore.config";
import { useNavigation } from "@react-navigation/native";

import OrderList from "../components/OrderList";
import { globalColor } from "../data";
import { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ConfigureContext } from "../context/configContext";

const Order = ({route}) => {
    const [updatedOrder, setUpdatedOrder] = useState([]);
    const owed = updatedOrder.reduce((total, order) => total + order.menuData.price, 0);
    const [orderStatus, setOrderStatus] = useState("");
    const tableId = route.params.tableId;
    const navigation = useNavigation();
    const { colorType } = useContext(ConfigureContext);
    const paid = 0;
    

    function pressHandler(itemData){
        navigation.navigate('individual', {item: itemData});
    }
    
    useEffect(() => {
        
        const fetchData = async () => {
        try {
            console.log(tableId)
            // Query the orders collection to get documents where customerId matches
            const orderQuerySnapshot = (await getDoc(doc(db, "order", tableId))).data();
            const results = [];
            setOrderStatus(orderQuerySnapshot.status);
            for (const order of orderQuerySnapshot.orders) {
                // Get the orderId from the order document
                const orderId = order.order;
                const time = order.time;
                const status = order.status;

                // Get the menu document corresponding to the orderId
                const menuDocRef = doc(db, "menu", orderId);
                const menuDocSnapshot = await getDoc(menuDocRef);

                if (menuDocSnapshot.exists()) {
                    // Combine data from both documents and add to the results array
                    results.push({
                        id: menuDocSnapshot.id,
                        time: time,
                        status: status,
                        menuData: menuDocSnapshot.data()
                    });

                } else {
                    console.log(`Menu document with ID ${orderId} does not exist.`);
                }
            }
            setUpdatedOrder(results);

        } catch (error) {
            console.error("Error retrieving data:", error);
        }

        }

        fetchData();
        console.log(updatedOrder);
        
    }, []);

    return (
        <LinearGradient colors={[colorType.backGroundLight, colorType.backGroundDark]} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Orders</Text>
            </View>
            <OrderList updatedOrders={updatedOrder} pressHandler={pressHandler} />
            <View style={styles.amountContainer}>
                <Text style={styles.status}>Status: {orderStatus}</Text>
            <View style={styles.row} >
                <View style={styles.labelColumn}>
                    <Text style={[styles.text, styles.space]}>Amount Owed:</Text>
                    <Text style={styles.text}>Amount Paid:</Text>
                </View>
                <View style={styles.valueColumn}>
                    <Text style={[styles.text, styles.space]}>{owed}</Text>
                    <Text style={styles.text}>{paid}</Text>
                </View>
            </View>
            </View>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    header: {
        marginBottom: 50,
        backgroundColor: globalColor.header,
        width: '100%',
        padding: 15
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: globalColor.white
    },
    amountContainer: {
        justifyContent: 'flex-end', 
        marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
      backgroundColor: globalColor.amount,
      height: 80,
      padding: 20,
      marginHorizontal: 13,
      borderRadius: 8,
      position: 'relative',
      bottom: 0,
      marginBottom: 30
    },
    labelColumn: {
      flex: 3, 
      marginRight: 10, 
    },
    valueColumn: {
      flex: 1,
    },
    text: {
        color: 'white',
    },
    space: {
        marginBottom: 10
    },
    status: {
        fontSize: 23,
        margin: 8,
        marginHorizontal: 21
    }
});
  

export default Order;