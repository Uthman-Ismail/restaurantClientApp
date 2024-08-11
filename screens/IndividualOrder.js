import { Image, View, Text, StyleSheet } from "react-native"

import {  globalColor } from "../data";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { ConfigureContext } from "../context/configContext";

const IndividualOrder = ({route}) => {
    const {colorType} = useContext(ConfigureContext);
    const order = route.params.item;
    return (
        <LinearGradient  colors={[colorType.backGroundLight, colorType.backGroundDark]} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Orders</Text>
            </View>
            <Text style={styles.title}>{order.title}</Text>
            <View>
                <Image style={styles.image} source={{uri: order.image}} />
            </View>
            <Text style={styles.text}>Price: ${order.price}</Text>
            <Text style={styles.text}>Description: {order.description}</Text>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    title: {
        margin: 14,
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 14,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    text: {
        marginBottom: 2,
        margin: 12,
        fontWeight: '800'
    },
    header: {
        marginBottom: 20,
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
});

export default IndividualOrder;