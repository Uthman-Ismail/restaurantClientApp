import { useEffect, useState } from "react";
import { FlatList,  View, Text, StyleSheet, Alert } from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firestore.config";
import { addOrder, globalColor} from "../data";
import MenuContainer from "./MenuContainer";
import RenderMeal from "./RenderMeal";
import SearchInput from "./SearchInput";

let cart = 0;
const Menu = ({handleCart, pressHandler, tableId, addPayment, payment}) => {
    const [isDrink, setIsDrink] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [isSearch, setSearch] = useState(false);
    const [myMenu, setMyMenu] = useState([]);

    useEffect(() => {
        if (cart > 0 && payment === 0) {
            navigation.navigate('evaluation');
        }
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "menu"));
            const menuData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
              // Set the menu data in the state
            setMyMenu(menuData);
            //console.log(myMenu)
        };
        fetchData();
    }, [payment, cart]);

    function handleOrder(id, title, amount) {
        cart = cart + 1;
        handleCart(cart); 
        addPayment(amount);
        addOrder(id, title, tableId, payment);
    }
    
    
    const search = (query) => {
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`^${escapedQuery}`, 'i');
      
        const results = myMenu.filter(item => regex.test(item.title));
        setSearchResult(results);
        
    };

    
    useEffect(() => {
        if(searchResult.length !== 0){
            setSearch(true);
        }
    }, [searchResult]); //I still need to figure out the screen

    function drinkPress(){
        setSearch(false);
        setIsDrink(true);
    }

    function foodPress(){
        setSearch(false);
        setIsDrink(false);
    }

    return <View>
            <SearchInput search={search} />
            <MenuContainer foodPress={foodPress} drinkPress={drinkPress} />
            <Text style={styles.text}>{isDrink ? 'Drinks' : 'Foods'}</Text>
            <FlatList data={isSearch ? searchResult :  myMenu} 
            keyExtractor={item => item.id} 
            renderItem={({ item }) => <RenderMeal itemData={item} handleOrder={handleOrder} pressHandler={pressHandler} />} numColumns={2}/>
        </View>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: globalColor.white,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 6
    }
});

export default Menu;