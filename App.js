import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import CategoryScreen from './screens/CategoryScreen';

const AppNavigator = createStackNavigator({
  Categories: { screen: CategoriesScreen },
  Pádel: { screen: CategoryScreen, params: {category: "Pádel" }},
  Fútbol: { screen: CategoryScreen, params: {category: "Fútbol" }},
});

export default createAppContainer(AppNavigator);