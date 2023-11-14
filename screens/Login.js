import { React, useState, useEffect } from "react";
import {View, ScrollView, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import {Card} from "react-native-elements";
import { auth } from "../database/firebase";
import {
  signInWithEmailAndPassword
} from "@firebase/auth";
import { firestore } from "../database/firebase";
import { getDocs, collection, query, where } from "@firebase/firestore";

const Login = (props) => {
  const[loginData, setLoginData] = useState({
    email:'',
    password:'',
});

  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [receivedPassword, setReceivedPassword] = useState(false);

  useEffect(() => { 
    // Trigger form validation when name,  
    // email, or password changes 
    validateForm(); 
    }, [loginData.email, loginData.password, receivedPassword]);

    const validateForm = () => {
      let errors = {};

      // Validate email field
      if (!loginData.email) {
        errors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
          errors.email = "Email is invalid.";
      }

      // Validate password field
      if (!loginData.password) {
        errors.password = "Password is required.";
      } else if (loginData.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }

      // Set the errors and update form validity
      setErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
    }; 

    const doLogin = async () => {
      if (isFormValid) {
        try {
          await signInWithEmailAndPassword(
            auth,
            loginData.email,
            loginData.password
          ).then( async (userCredential) => {
              const user = query(collection(firestore, "users"), where("userId", "==" , userCredential.user.uid));
              const userSnap = await getDocs(user); 
              userSnap.forEach((doc) => {
                console.log(doc.data());
                setUser(doc.data()); //User retrieval
              });
              if (user !== null){
                props.navigation.navigate("Categories");
              }
          });
        } catch (error) {
          throw error;
        }
      }
    };

    const doSignup = () => {
        props.navigation.navigate("Signup");
    };

    return (
      <ImageBackground source={require("../login.jpg")} style={styles.image}>
        <Text style={styles.principal}>Inicio de sesión</Text>
        <Card containerStyle={styles.card}>
          <ScrollView>
            <View>
              <Text style={styles.regText}>Email:</Text>
              <TextInput
                style={styles.regText}
                placeholder="ejemplo@gmail.com"
                onChangeText={(value) =>
                  setLoginData({ ...loginData, email: value })
                }
              ></TextInput>
            </View>
            <View>
              <Text style={styles.regText}>Password:</Text>
              <TextInput
                style={styles.regText}
                secureTextEntry={true}
                placeholder="Mínimo 6 caracteres"
                onChangeText={(value) =>
                  setLoginData({ ...loginData, password: value })
                }
              ></TextInput>
            </View>
            <View >
              <TouchableOpacity onPress={doLogin} disabled={!isFormValid} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity title="Registrarse" onPress={doSignup} style={styles.button}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
            {Object.values(errors).map((error, index) => (
              <Text key={index} style={styles.error}>
                {error}
              </Text>
            ))}
          </ScrollView>
        </Card>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10%",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 10,
    margin: 15,
    marginTop: "20%",
    borderRadius: 10,
    alignContent: "center",
  },
  error: {
    marginTop: "5%",
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  button: {
    padding: 5,
    marginTop: "7%",
    backgroundColor: "darkslateblue",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  regText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});

export default Login;