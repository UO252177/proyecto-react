import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { firestore } from '../database/firebase';

const CategoryScreen = (props) => {
//   const {category} = route.params;
//   console.log(category);

React.useEffect(() => {
  const collectionRef = collection(firestore, "partidos");
  const q = query(collectionRef,orderBy("createdAt", "desc")); //A PARTIR DE AQUI CAMBIAR
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // onSnapshot is a listener that listens to changes in the database in realtime
    console.log("pasando por el useEffect en el unsubscribe");
    setProducts(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        emoji: doc.data().emoji,
        name: doc.data().name,
        price: doc.data().price,
        isSold: doc.data().isSold,
        createdAt: doc.data().createdAt,
      }))
    );
  });
  return unsubscribe; // unsubscribe from the listener when the component is unmounting
  // because it avoids memory leaks
}, []);

  return (
    <View>
        <Card>
            <Card.Title>{props.navigation.params.title}</Card.Title>
        </Card>
      
    </View>
  );
};

export default CategoryScreen;
