import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import {Card} from "react-native-elements";

const CategoriesScreen = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={require("../back.jpg")} style={styles.image}>
        <Text style={styles.principal}>APPUESTAS</Text>
        <Card containerStyle={styles.card}>
          <View style={styles.margins}>
            <Button
              title="Pádel"
              onPress={() => navigation.navigate("Pádel")}
            />
          </View>
          <View style={styles.margins}>
            <Button
              title="Fútbol"
              onPress={() => navigation.navigate("Fútbol")}
            />
          </View>
          <View style={styles.margins}>
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
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
    marginTop: '10%'
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
  }
});

export default CategoriesScreen;
