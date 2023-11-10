import React from 'react';
import { View, Text } from 'react-native';

const CategoryScreen = ({ route }) => {
  const { category } = route.params;

  return (
    <View>
        <Card>
            <Card.Title>{category}</Card.Title>
        </Card>
      
    </View>
  );
};
