import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import CategoriesScreen from './screens/CategoriesScreen';
import CategoryScreen from './screens/CategoryScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Fútbol" component={CategoryScreen} initialParams={{title: "Fútbol"}}/>
        <Stack.Screen name="Pádel" component={CategoryScreen} initialParams={{title: "Pádel"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;