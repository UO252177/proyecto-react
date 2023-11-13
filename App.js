import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';

import CategoriesScreen from './screens/CategoriesScreen';
import CategoryScreen from './screens/CategoryScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Futbol" component={CategoryScreen} options={{title: "Furbo"}}/>
        <Stack.Screen name="Padel" component={CategoryScreen} options={{title: "Pádel"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;