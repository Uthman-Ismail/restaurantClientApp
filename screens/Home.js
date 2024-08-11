import { View, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import LogoTemplete from "../components/LogoTemplate";
import ButtonInbuilt from "../components/ButtonInbuilt";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import { globalColor } from "../data";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../firestore.config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ConfigureContext } from "../context/configContext";


const Home = ({route}) => {
    const [cart, setCart] = useState(0);
    const [table, setTable] = useState(false);
    const tableId = route.params.tableId;
    const navigation = useNavigation();
    const { colorType, img, addPayment, payment } = useContext(ConfigureContext);

    function handleCart(num){
        setCart(num);
    }

    async function handleCall(){
        try{
            const tableRef = doc(db, 'table', tableId);
            const tableSnapshop = (await getDoc(tableRef)).data()?.employeeId;
            const requestRef = doc(db, 'request', tableId);
            if(tableSnapshop){
                await setDoc(requestRef, {
                    id: tableId,
                    employeeId: tableSnapshop
                });
            }else{
                await setDoc(requestRef, {
                    id: tableId,
                    employeeId: "undefined"
                })
            }
            console.log('Request sent with Id: ', requestRef.id);
            console.log("color", colorType);
        }catch(e){
            console.log('Error creating request: ', e);
        } 
    }

    useEffect(() => {
        const createTable = async () => {
            if(cart === 1 && !table){
                try{
                    const tableRef = doc(db, 'table', tableId);
                    await setDoc(tableRef, {
                        id: tableId
                    });
                    setTable(true);
                    console.log('Success creating order');
                }catch(e){
                    console.log('Error creating order: ', e);
                }
            }
        }
        createTable();
    }, [cart, tableId, table]);

    function pressHandler(itemData){
        navigation.navigate('individual', {item: itemData});
    }

    function handleOrder(){
        navigation.navigate('order', {tableId: tableId});
    }

    function handleProfile(){
        navigation.navigate('profile', {tableId: tableId});
    }
    
    return (
        <LinearGradient colors={[colorType.backGroundLight, colorType.backGroundDark]} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <LogoTemplete logo = {img} roundImage={styles.image} />
                <View style={styles.buttonContainer}>
                    <ButtonInbuilt title='Profile' style={styles.headButton} onPress={handleProfile}  />
                    <ButtonInbuilt title={`cart(${cart})`} style={styles.headButton} onPress={handleOrder} />
                </View>
            </View>
            <Menu addPayment={addPayment} payment={payment} handleCart={handleCart} pressHandler={pressHandler} tableId = {tableId} />
            <View style={styles.bottomButtonContainer}>
                <ButtonInbuilt title='Call a Waiter' style={styles.button} textStyle={styles.text} onPress={handleCall}/>
            </View>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginHorizontal: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        marginLeft: 'auto', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
    },
    image: {
        width: 50, 
        height: 50, 
        borderRadius: 25,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20, // Adjust as needed
        alignSelf: 'center', // Align the button to the center horizontally
        width: '100%',
        borderBottomEndRadius: 20,
        height: 50,
        backgroundColor: globalColor.buttomButtonHome,
    },
    text:{
        fontSize: 20,
        color: globalColor.white,
        textShadowColor: globalColor.black,
        textShadowOffset: {
            width: 0,
            height: 10
        }
    },
    headButton:{
        backgroundColor: globalColor.white,
        borderRadius: 8,
        padding: 8,
    }
});


export default Home;