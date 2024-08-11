import { View, Image, StyleSheet } from "react-native";


const LogoTemplete = ({roundImage, logo}) => {
    return (
        <View>
            <Image
                source={{uri: logo}}
                style={roundImage}
            />
        </View>
    );
}

export default LogoTemplete;