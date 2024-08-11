import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { app } from './firestore.config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Order from './screens/Order';
import Evaluation from './screens/Evaluation';
import IndividualOrder from './screens/IndividualOrder';
import { ConfigureContextProvider } from './context/configContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
        <ConfigureContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
          headerShown: false, 
          cardStyle: { backgroundColor: 'transparent' }, 
        }}>
            <Stack.Screen name='welcome' component={Welcome} />
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='order' component={Order} />
            <Stack.Screen name='profile' component={Profile} />
            <Stack.Screen name='individual' component={IndividualOrder} />
            <Stack.Screen name='evaluation' component={Evaluation} />
          </Stack.Navigator>
        </NavigationContainer>
        </ConfigureContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
