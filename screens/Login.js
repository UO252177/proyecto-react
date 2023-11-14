import { React, useState, useEffect } from "react";
import {View, ScrollView, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../database/firebase";

const Login = (props) => {
  const[loginData, setLoginData] = useState({
    email:'',
    password:'',
});


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

    const doLogin = () => {
      if (isFormValid) {
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const doSignup = () => {
        props.navigation.navigate("Signup");
    };

    return (
      <ScrollView>
        <Text>Inicio de sesión</Text>
        <View>
          <Text>Email:</Text>
          <TextInput
            placeholder="Email"
            onChangeText={(value) =>
              setLoginData({ ...loginData, email: value })
            }
          ></TextInput>
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(value) =>
              setLoginData({ ...loginData, password: value })
            }
          ></TextInput>
        </View>
        <View>
          <Button title="Iniciar sesión" onPress={doLogin} disabled={!isFormValid}/>
          <Button title="Registrarse" onPress={doSignup} />
        </View>
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  error:{
      color:'red'
  }
});

export default Login;