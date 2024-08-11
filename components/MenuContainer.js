import { Pressable, View, StyleSheet, Text } from 'react-native';


const MenuContainer = ({foodPress, drinkPress, text}) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={foodPress}>
                <View style={[styles.tab, styles.foodTab]}>
                    <Text>Food</Text>
                </View>
            </Pressable>
            <Pressable onPress={drinkPress}>
                <View style={[styles.tab, styles.container]}>
                    <Text>Drink</Text>
                </View>
            </Pressable>           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 35,
      backgroundColor: '#FFFFFF',
      marginHorizontal: 8,
      borderRadius: 8
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 9,
      paddingRight: 9
    },
    foodTab: {
      borderRightWidth: 1,
      borderRightColor: 'black',
    },
    drinkTab: {
      borderLeftWidth: 1,
      borderLeftColor: 'black',
    },
});

export default MenuContainer;
  