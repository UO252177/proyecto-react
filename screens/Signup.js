import {React, useState, useEffect} from "react";
import {View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, ImageBackground} from "react-native";
import {Card} from "react-native-elements";
import { auth } from "../database/firebase";
import {
  createUserWithEmailAndPassword
} from "@firebase/auth";
import {firestore} from "../database/firebase";
import {setDoc, doc} from "@firebase/firestore";



const Signup = ({ navigation }) => {
    
    const[signupData, setSignupData] = useState({
        email:'',
        name:'',
        phone:'',
        balance: 0,
        password:'',
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => { 
  
        // Trigger form validation when name,  
        // email, or password changes 
        validateForm(); 
    }, [signupData.name, signupData.email, signupData.password, signupData.phone]); 
  
    const validateForm = () => { 
        let errors = {}; 
  
        // Validate name field 
        if (!signupData.name) { 
            errors.name = 'Name is required.'; 
        } 
  
        // Validate email field 
        if (!signupData.email) { 
            errors.email = 'Email is required.'; 
        } else if (!/\S+@\S+\.\S+/.test(signupData.email)) { 
            errors.email = 'Email is invalid.'; 
        } 
  
        // Validate password field 
        if (!signupData.password) { 
            errors.password = 'Password is required.'; 
        } else if (signupData.password.length < 6) { 
            errors.password = 'Password must be at least 6 characters.'; 
        }

        if (!signupData.phone) { 
            errors.phone = 'Phone is required.'; 
        } else if (signupData.phone.length != 9) { 
            errors.phone = 'Phone must be 9 characters long.'; 
        } 
  
        // Set the errors and update form validity 
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 


    const doRegister = async () => {
        if (isFormValid) {
            try {
                  await createUserWithEmailAndPassword(
                  auth,
                  signupData.email,
                  signupData.password,
                ).then(async (userCredential) => {
                    //Añadir al usuario en la base de datos
                    await setDoc(doc(firestore, "users",userCredential.user.uid), {
                        name: signupData.name,
                        email: signupData.email,
                        phone: signupData.phone,
                        balance: 10
                    }).then(() => {
                        console.log("User added - ID:", userCredential.user.uid);
                        navigation.navigate('Categories', {user: userCredential.user});
                    }).catch((error) => {
                        console.log("Error adding user: ", error);
                    });
                });
              } catch (error) {
                  throw error;
              };              
        }
    };

    return (
      <ImageBackground source={require("../login.jpg")} style={styles.image}>
        <Text style={styles.principal}>Registro</Text>
        <Card containerStyle={styles.card}>
          <ScrollView>
            <View>
              <Text style={styles.regText}>Nombre:</Text>
              <TextInput
                style={styles.regText}
                placeholder="Ejemplo: Juan"
                onChangeText={(value) =>
                  setSignupData({ ...signupData, name: value })
                }
              ></TextInput>
            </View>
            <View>
              <Text style={styles.regText}>Email:</Text>
              <TextInput
                style={styles.regText}
                placeholder="Email"
                onChangeText={(value) =>
                  setSignupData({ ...signupData, email: value })
                }
              ></TextInput>
            </View>
            <View>
              <Text style={styles.regText}>Teléfono:</Text>
              <TextInput
                style={styles.regText}
                placeholder="Número de teléfono"
                onChangeText={(value) =>
                  setSignupData({ ...signupData, phone: value })
                }
              ></TextInput>
            </View>
            <View>
              <Text style={styles.regText}>Password:</Text>
              <TextInput
                style={styles.regText}
                secureTextEntry={true}
                onChangeText={(value) =>
                  setSignupData({ ...signupData, password: value })
                }
              ></TextInput>
            </View>
            <View>
              <TouchableOpacity onPress={doRegister} disabled={!isFormValid} style={styles.button}>
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
    marginTop: "10%",
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
    backgroundColor: "darkslateblue",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  regText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});

export default Signup;