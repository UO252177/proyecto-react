import { React, useState, useEffect } from "react";
import {View, ScrollView, Text, TextInput, Button, StyleSheet } from "react-native";
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
          <Button
            title="Iniciar sesión"
            onPress={doLogin}
            disabled={!isFormValid}
          />
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