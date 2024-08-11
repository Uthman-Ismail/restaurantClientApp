import { View, Text, StyleSheet } from "react-native";

import FiveStars from "./FiveStars";
import { globalColor } from "../data";


const Rate = ({text,  newRating }) => {
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.star}>
                <FiveStars onRatingChange={newRating} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColor.rate,
        height: 130,
        width: 250,
        padding: 10,
        margin: 10,
        borderRadius: 8
    },
    text: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    star: {
        marginTop: 20
    }
});

export default Rate;