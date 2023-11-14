import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Image } from 'react-native-elements';

import CategoriesScreen from './screens/CategoriesScreen';
import CategoryScreen from './screens/CategoryScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50}}
      source={require('./logo.png')}
    />
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories" screenOptions={{
        headerStyle: {
          backgroundColor: '#8bc999',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: (props) => <LogoTitle {...props} /> }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerTitle: (props) => <LogoTitle {...props} /> }}/>
        <Stack.Screen name="Categories" component={CategoriesScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Fútbol" component={CategoryScreen} initialParams={{title: "Fútbol"}} options={{ headerTitle: (props) => <LogoTitle {...props} /> }}/>
        <Stack.Screen name="Pádel" component={CategoryScreen} initialParams={{title: "Pádel"}} options={{ headerTitle: (props) => <LogoTitle {...props} /> }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;