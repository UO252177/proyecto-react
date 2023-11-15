import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { firestore } from '../database/firebase';
import { collection, onSnapshot, where, orderBy, query } from "firebase/firestore";
import Partido from '../components/Partido';
import Balance from '../components/Balance';

const CategoryScreen = ({route}) => {
const cat = route.params.title;
const[partidos, setPartidos] = React.useState([]);

React.useEffect(() => {
  const collectionRef = collection(firestore, "partidos");
  const q = query(collectionRef, where("categoria", "==", cat), where("finalizado", "==", false));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // onSnapshot is a listener that listens to changes in the database in realtime
    console.log("pasando por el useEffect en el unsubscribe");
    setPartidos(
      querySnapshot.docs.map((doc) => ({
        key: doc.id,
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
        <Card containerStyle={styles.titleContainer}>
            <Card.Title style={styles.title}>{cat}</Card.Title>
        </Card>
        <ScrollView>
        {partidos.map((partido) => (
            <Partido key={partido.id} {...partido} />

        ))}
        </ScrollView>
        <View style={{position: "absolute", top: "0.5%", right: "1%"}}>
          <Balance />
        </View>         
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 16,
    paddingBottom: 0,
    backgroundColor: 'lightsteelblue',
    margin: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});