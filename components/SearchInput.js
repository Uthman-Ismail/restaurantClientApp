import { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
//import Ionicons from '@expo/vector-icons/Ionicons';

const SearchInput = ({search}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() === '') {
      Alert.alert('Search Text is empty');
      return;
    }    
    search(searchText);
    setSearchText('');
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {//<Ionicons name="search" size={24} style={styles.icon} />   
        }     
        <TextInput
            style={styles.input}
            placeholder='SEARCH' 
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch} // Call handleSearch on "Enter" key press
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingHorizontal: 10,
      position: 'relative', 
      backgroundColor: 'white',
    },
    input: {
      flex: 1,
      height: 40, 
      marginLeft: 30,
    },
    icon: {
      position: 'absolute',
      left: 10, // Adjust as needed to position the icon
    },
  });

export default SearchInput;
