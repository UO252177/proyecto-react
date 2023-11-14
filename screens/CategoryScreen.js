import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { firestore } from '../database/firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Partido from '../components/Partido';

const CategoryScreen = ({route}) => {
const cat = route.params.title;
const[partidos, setPartidos] = React.useState([]);

React.useEffect(() => {
  const collectionRef = collection(firestore, "partidos");
  const q = query(collectionRef,  orderBy("fechaFin", "asc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // onSnapshot is a listener that listens to changes in the database in realtime
    console.log("pasando por el useEffect en el unsubscribe");
    setPartidos(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        fechaFin: doc.data().fechaFin,
        fechaInicio: doc.data().fechaInicio,
        isFinalizado: doc.data().finalizado,
        participantes: doc.data().participantes,
        ratios: doc.data().ratios,
        ganador: doc.data().ganador
      }))
    );
  });
  return unsubscribe; // unsubscribe from the listener when the component is unmounting
  // because it avoids memory leaks
}, []);

  return (
    <View>
        <Card>
            <Card.Title>{cat}</Card.Title>
        </Card>
        <ScrollView>
        {partidos.map((partido) => (
            <Partido key={partido.id} {...partido} />

        ))}
        </ScrollView>      
    </View>
  );
};

export default CategoryScreen;
