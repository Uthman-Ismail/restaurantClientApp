import { Pressable, View, Text, StyleSheet } from "react-native";

const ButtonInbuilt = ({onPress, title, style, textStyle}) => {
    return (
        <View>
        <Pressable onPress={onPress} 
        style={({pressed}) => pressed ? [styles.container, styles.pressed] : styles.container} >
            <View style={[styles.veiwContainer, style]}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </View>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 2,
        marginVertical: 3,
        borderRadius: 10,
        padding: 7,
        elevation: 4,
    },
    veiwContainer: {
        padding: 2,
    },
    text: {
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.5,
    },
});

export default ButtonInbuilt;