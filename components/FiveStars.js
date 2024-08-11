import { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";

import StarIcon from "./StarIcon";
import StarEmptyIcon from "./StarEmptyIcon";


const FiveStars = ({ onRatingChange}) => {
    const [rating, setRating] = useState(0);
    let newRating = rating;

    const handleStarPress = (star) => {

        if (newRating === star) {
            // If the star is already pressed, unpress it
            newRating = 0;
            onRatingChange(0);
        } else {
            // Otherwise, set the new rating to the pressed star
            newRating = star;
            onRatingChange(star);
        }

        setRating(newRating);
    };



    return (
    <View style={styles.starsContainer}>
        <Pressable onPress={() => handleStarPress(1)} 
        style={({pressed}) => pressed ? [styles.star, styles.pressed] : styles.star}>
            {rating >= 1 ? <StarIcon /> : <StarEmptyIcon />}
        </Pressable>
        <Pressable onPress={() => handleStarPress(2)} 
        style={({pressed}) => pressed ? [styles.star, styles.pressed] : styles.star}>
            {rating >= 2 ? <StarIcon /> : <StarEmptyIcon />}
        </Pressable>
        <Pressable onPress={() => handleStarPress(3)} 
        style={({pressed}) => pressed ? [styles.star, styles.pressed] : styles.star}>
            {rating >= 3 ? <StarIcon /> : <StarEmptyIcon />}
        </Pressable>
        <Pressable onPress={() => handleStarPress(4)} 
        style={({pressed}) => pressed ? [styles.star, styles.pressed] : styles.star}>
            {rating >= 4 ? <StarIcon /> : <StarEmptyIcon />}
        </Pressable>
        <Pressable onPress={() => handleStarPress(5)} 
        style={({pressed}) => pressed ? [styles.star, styles.pressed] : styles.star}>
            {rating >= 5 ? <StarIcon /> : <StarEmptyIcon />}
        </Pressable>
    </View>
  
    );
}

const styles = StyleSheet.create({
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        marginRight: 10, 
    },
    pressed: {
        opacity: 0.5,
    },
});
  

export default FiveStars;