//import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View, Text, StyleSheet } from "react-native";


function Icon({name, size, color, onPress}){
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.container}>
                {//<Ionicons name={name} size={size} color={color} />
                }
                <Text>+</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
});

export default Icon;