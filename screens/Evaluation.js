import { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { doc, collection, getDoc , addDoc} from "firebase/firestore";

import { db } from "../firestore.config";
import Rate from "../components/Rate";
import ButtonInbuilt from "../components/ButtonInbuilt";
import { globalColor } from "../data";
import { LinearGradient } from "expo-linear-gradient";
import { ConfigureContext } from "../context/configContext";


const Evaluation = () => {
    const [foodRating, setFoodRating] = useState(0);
    const [waiterRating, setWaiterRating] = useState(0);
    const {tId} = useContext(ConfigureContext);
    const tableId = tId;
    function foodRatingChange(rating){
        setFoodRating(rating);
    }

    function waiterRatingChange(rating){
        setWaiterRating(rating);
    }
    
    async function handleRate(){
        const tableRef = doc(db, "table", tableId);
        const tableSnap = await getDoc(tableRef);
        const name = tableSnap.data().name;
        try{
            await addDoc(collection(db, "evaluation"), {
                tableId: tableId,
                name: name,
                food: foodRating,
                service: waiterRating,
                date: new Date().toISOString()
            });
            console.log('Success');
        }catch(e){
            console.log('error in evaluation: ', e);
        } 
    }
    

    async function handleAnonymous(){
        try{
            const orderQuerySnapshot = (await getDoc(doc(db, "order", tableId))).data();
            const employeeId = orderQuerySnapshot.employeeId;
            await addDoc(collection(db, "evaluation"), {
                tableId: tableId,
                food: foodRating,
                service: waiterRating, 
                employeeId: employeeId,
                date: new Date().toISOString()
            });
            console.log('Success');
        }catch(e){
            console.log('error in evaluation: ', e);
        }       
    }
    
    function handleCancel(){
        setFoodRating(0);
        setWaiterRating(0);
        Alert.alert("Cancel Evaluation", "Evaluation cancel");
    }
    
    return (
        <LinearGradient colors={[globalColor.backGroundLight, globalColor.backGroundDark]} style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.text}>Thank You For Your Visit</Text>
            <Text style={styles.text}>Rate Us</Text>
            <View style={styles.rate}>
                <Rate text='Rate Our Food' newRating={foodRatingChange}  />
                <Rate text='Rate The Waiter' newRating={waiterRatingChange} />
            </View>
            <View>
                <ButtonInbuilt title='Submit' style={styles.button} textStyle={styles.text} onPress={handleRate}/>
                <ButtonInbuilt title='Submit Anonymously' style={styles.button} textStyle={styles.text} onPress={handleAnonymous}/>
                <ButtonInbuilt title='Cancel' style={styles.button} textStyle={styles.text} onPress={handleCancel} />
            </View>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    rate: {
        margin: 30
    },
    buttonContainer: {
        alignSelf: 'baseline'
    },
    button: {
        width: 210,
        backgroundColor: globalColor.button,
        padding:8,
        borderRadius: 8
    },
});

export default Evaluation;