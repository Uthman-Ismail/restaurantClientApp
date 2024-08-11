import { View, Text, StyleSheet } from "react-native";
import { CameraView} from "expo-camera";
import { useNavigation } from "@react-navigation/native";

import LogoTemplete from "../components/LogoTemplate";
import ButtonInbuilt from "../components/ButtonInbuilt";
import { globalColor } from "../data";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState, useEffect } from "react";
import { ConfigureContext } from "../context/configContext";
import { db } from "../firestore.config";
import { doc, getDoc} from "firebase/firestore";


const Welcome = () => {
    const {addColor, addImage, colorType} = useContext(ConfigureContext);
    const navigation = useNavigation();
    const [input, setInput] = useState({
        name: '',
        address: '',
        number: ''
      });
      const [item, setItem] = useState({
        backGroundLight: '',
        backGroundDark: '',
    });
    const [img, setImage] = useState()
    
    const handleScan = async () => {
        let barcodeHandled = false;
        await CameraView.launchScanner();
            CameraView.onModernBarcodeScanned((event) => {
                if (!barcodeHandled) {
                //console.log(event);
                navigation.navigate('home', {tableId: event.data});
                CameraView.dismissScanner();
                barcodeHandled = true; // Set the flag to true after handling the event so the listener only runs once
            }
            });
        
    };
    
    useEffect(() => {
        const fetchConfig = async () => {
          try{
            const config = await getDoc(doc(db, "configurations", "nvEdfsh9FXNGy6oVzKoU"));
            if(config.exists()){
              setInput(preVal => ({
                ...preVal,
                name: config.data().name,
                address: config.data().address,
                number: config.data().number,
              }));
              setItem(preVal => ({
                ...preVal,
                backGroundLight: config.data().backGroundLight,
                backGroundDark: config.data().backGroundDark
              }));
              addColor(item);
              setImage(config.data().image);
              addImage(config.data().image);
            }
          }catch(e){
            console.log("Error:", e);
          }
        }
        fetchConfig();
      }, []);

    return (
        <LinearGradient colors={[item.backGroundLight, item.backGroundDark]} style={styles.container} >
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.text}>WELCOME</Text>
                <Text style={styles.text}>TO</Text>
                <Text style={styles.text}>{input.name}</Text>
            </View>
            <LogoTemplete logo={img} roundImage={styles.roundImage} />
            <ButtonInbuilt title='Scan Qr' onPress={handleScan} textStyle={styles.buttonText} style={styles.button}/>
            <View style={styles.info}>
                <Text style={styles.infoText}>{input.address}</Text>
                <Text style={styles.infoText}>{input.number}</Text>
            </View>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: globalColor.white,
        fontSize: 30,
        fontWeight: 'normal',
    },
    welcome: {
        marginBottom: 20,
    },
    buttonText: {
        fontWeight: 'normal',
        fontSize: 25,
        color: '#7585BD'
    },
    button:{
        padding: 8,
        width: 190,
        backgroundColor: globalColor.white,
        borderRadius: 8
    },
    info: {
        position: 'absolute',
        bottom: 20, // Adjust as needed
        alignSelf: 'center', // Align the button to the center horizontally
    }, 
    infoText: {
        textAlign: 'center',
        color: globalColor.white,
        padding: 2
    },
    roundImage: {
        width: 250, 
        height: 250, 
        borderRadius: 125, 
      },
});

export default Welcome;