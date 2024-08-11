import { View, Text, Platform, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { globalColor } from "../data";


const OrderList = ({updatedOrders, pressHandler}) => {
    const sortedOrders = updatedOrders.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    function renderOrder(itemData){
        return <View style = {styles.container}>
            <Pressable onPress={pressHandler.bind(this, itemData.item.menuData)} android_ripple={color = '#ccc'} 
                    style = {({pressed}) => [styles.button, pressed? styles.pressed: null] }>
                <View style = {styles.innerContainer} >
                    <View style={styles.imageColumn} >
                        <Image source={{uri: itemData.item.menuData.image}} style={styles.image}/>
                    </View>
                    <View style={styles.contentColumn}>
                        <Text style={styles.title}>{itemData.item.menuData.title}</Text>
                        <Text style={styles.price}>Price: ${itemData.item.menuData.price}</Text>
                        <Text style={styles.time}>Time of Order: {itemData.item.time}</Text>
                        {itemData.item.menuData.waiter && <Text>Waiter: {itemData.item.menuData.waiter}</Text>}                        
                    </View>
                </View>
            </Pressable>
        </View>
    }
    
    return <FlatList data={sortedOrders} keyExtractor={item => item.id + Math.random()} renderItem={renderOrder} />
}

const styles = StyleSheet.create({
    container: {
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
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    imageColumn: {
        marginRight: 5
    },
    contentColumn: {
        flex: 1, 
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: { 
        width: 140,
        height: 120,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
});

export default OrderList;