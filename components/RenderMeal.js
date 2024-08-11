import { View, Pressable, Image, Text, StyleSheet, Platform, Dimensions } from "react-native";

import Icon from "./Icon";
import { globalColor } from "../data";

const screenWidth = Dimensions.get('window').width;

const RenderMeal = ({itemData, handleOrder, pressHandler}) => {
    
    
    return <View style = {styles.gridView}>
        <Pressable onPress={pressHandler.bind(this, itemData)} android_ripple={color = '#ccc'} 
                style = {({pressed}) => [styles.button, pressed? styles.pressed: null] }>
            <View style = {styles.innerContainer} >
                <Image source={{uri: itemData.image}} style={styles.image}/>
                <Text style={styles.title}>{itemData.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${itemData.price}</Text>
                    <Icon onPress={handleOrder.bind(this,itemData.id, itemData.title, itemData.price)} />
                </View>
            </View>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        margin: 16,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: globalColor.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    pressed: {
        opacity: 0.25,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: { 
        marginBottom: 2,
        width: screenWidth / 2.4,
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingStart: 5
    },
    price: {    
        fontSize: 16,
        marginRight: 5,
    },
});

export default RenderMeal;