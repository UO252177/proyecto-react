import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import {Card} from "react-native-elements";

const CategoriesScreen = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={require("../field.jpg")} style={styles.image}>
        <Text style={styles.principal}>APPUESTAS</Text>
        <Card containerStyle={styles.card}>
            <TouchableOpacity style={[styles.button, styles.margins]} onPress={() => navigation.navigate("Pádel")}>
              <Text style={styles.catName}>Pádel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.margins]} onPress={() => navigation.navigate("Fútbol")}>
              <Text style={styles.catName}>Fútbol</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.margins]} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.catName}>Login</Text>
            </TouchableOpacity>
            {/* <Button
              title="Pádel"
              onPress={() => navigation.navigate("Pádel")}
            /> */}
        </Card>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  principal:{
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color:'white',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '35%'
  },
  sub:{
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color:'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '25%'
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    margin: 10,
    marginTop: "20%",
    borderRadius: 10,
    alignContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  margins:{
    margin:20
  },
  button: {
    padding: 5,
    margin: 3,
    backgroundColor: '#8bc999',
    borderRadius: 8,
    alignItems: 'center',
  },
  catName:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  }
});

export default CategoriesScreen;
