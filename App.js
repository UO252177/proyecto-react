import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import CategoryScreen from './screens/CategoryScreen';

const AppNavigator = createStackNavigator({
  Categories: { screen: CategoriesScreen },
  Category: { screen: CategoryScreen }
});

export default createAppContainer(AppNavigator);