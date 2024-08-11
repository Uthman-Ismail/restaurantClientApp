import { useContext, useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, Alert } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus,
            useMediaLibraryPermissions, launchImageLibraryAsync } from 'expo-image-picker';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firestore.config";
import avatar from '../assets/images/logo.png';
import ButtonInbuilt from "../components/ButtonInbuilt";
import { LinearGradient } from "expo-linear-gradient";

import { globalColor } from "../data";
import { ConfigureContext } from "../context/configContext";


const Profile = ({route}) => {
    const [input, setInput] = useState('');
    const [isImage, setIsImage] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [libraryPermission, requestLibraryPermission] = useMediaLibraryPermissions();
    const [image, setImage] = useState(null);
    const [isData, setIsData] = useState(false);
    const tableId = route.params.tableId;
    const {colorType} = useContext(ConfigureContext);

    async function checkPermission(){
        if(permission.status === PermissionStatus.UNDETERMINED){
            await requestPermission();
            return permission.granted;
        }

        if(permission.status === PermissionStatus.DENIED){
            Alert.alert('Permision not granted', 'you cant use the camera');
            return false;
        }
        return true;
    }

    async function checkLibraryPermission(){
        if(libraryPermission.status === PermissionStatus.UNDETERMINED){
            await requestLibraryPermission();
            return libraryPermission.granted;
        }

        if(libraryPermission.status === PermissionStatus.DENIED){
            Alert.alert('Permision not granted', 'you can not access gallery without granting permission');
            return false;
        }
        return true;
    }
    
    async function handleImage(){   
        Alert.alert('Choice', 'Take Picture or choose from gallery',
            [
              {
                text: 'Camera',
                onPress: () => {camera();},
              },
              {
                text: 'Gallery',
                onPress: () => {gallery();},
              },
            ]
        );
        async function camera(){
            const check = await checkPermission();
            
            if(!check){
                return;
            }
            const img = (await launchCameraAsync()).assets[0].uri;
            console.log(img);
            setImage(img);
        }

        async function gallery(){
            const checkLibrary = await checkLibraryPermission(); 
            if(!checkLibrary){
                return;
            }
            const img = (await launchImageLibraryAsync()).assets[0].uri;
            console.log(img);
            setImage(img);
        }
    }

    useEffect(() => {
        image && setIsImage(true);
        const updateData = async () => {
            
            try {
                const tableDocRef = doc(db, "table", tableId);

                const data = {
                    image: image,
                    name: input
                };

                await setDoc(tableDocRef, data, { merge: true });
               
                console.log("Document successfully updated!");
                Alert.alert("Sucess","Document successfully updated!");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
            
        }
        if(isData){
            updateData();
            setIsData(false);
        }
    }, [image, isData]);

    function handleUpdate(){
        console.log(image, input);
        if(input || image){
            setIsData(true);
        }
    }

    return (
        <LinearGradient  colors={[colorType.backGroundLight, colorType.backGroundDark]} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit Profile</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={isImage ? {uri: image} : avatar} style={styles.image}/>
                <ButtonInbuilt title='Edit Image' style={styles.edit} textStyle={styles.editText} onPress={handleImage} />
            </View>
            <View style={styles.usernameContainer}>
                <Text>Username</Text>
                <TextInput 
                style={styles.textInput}
                value={input}
                onChangeText={setInput} />
            </View>
            <View style={styles.buttonContent}>
                <ButtonInbuilt title='Update' style={styles.update} textStyle={styles.updateText} onPress={handleUpdate} />
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
        backgroundColor: '#533299',
        width: '100%',
        padding: 15
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    content: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
    },
    imageContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        marginBottom: 3,
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    edit: {
        backgroundColor: '#4E29B9',
        width: 150,
        padding: 7,
        borderRadius: 10,
    },
    editText: {
        color: 'white',
        fontSize: 18,
    },
    usernameContainer: {
        marginBottom: 20,
        paddingHorizontal: 25,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: 'white'
    },
    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: 0,
        marginTop: 100
    },
    update: {
        backgroundColor: '#4E29B9',
        width: 180,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Profile;