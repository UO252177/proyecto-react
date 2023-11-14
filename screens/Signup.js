import {React, useState, useEffect} from "react";
import {View, Text, ScrollView, Button, TextInput, StyleSheet} from "react-native";
import { auth } from "../database/firebase";
import {
  createUserWithEmailAndPassword
} from "@firebase/auth";
import {firestore} from "../database/firebase";
import {addDoc, collection} from "@firebase/firestore";



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


    const doRegister = async (email,password) => {
        if (isFormValid) {
            try {
                  await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                ).then((userCredential) => {
                    //Añadir al usuario en la base de datos
                    addDoc(collection(firestore, "users"), {
                        userId: userCredential.user.uid,
                        name: signupData.name,
                        email: signupData.email,
                        phone: signupData.phone,
                        balance: 10
                    }).then(() => {
                        console.log("User " + userCredential.user.name +" added - ID:", userCredential.user.uid);
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

    return(
        <ScrollView>
            <Text>Registrarse</Text>
            <View>
                <Text>Nombre:</Text>
                <TextInput placeholder="Nombre" onChangeText={(value) => setSignupData({ ...signupData, name: value })}></TextInput>
            </View>
            <View>
                <Text>Email:</Text>
                <TextInput placeholder="Email" onChangeText={(value) => setSignupData({ ...signupData, email: value })}></TextInput>
            </View>
            <View>
                <Text>Teléfono:</Text>
                <TextInput placeholder="Número de teléfono" onChangeText={(value) =>setSignupData({ ...signupData, phone: value })}></TextInput>
            </View>
            <View>
                <Text>Password:</Text>
                <TextInput secureTextEntry={true} onChangeText={(value) => setSignupData({ ...signupData, password: value })}></TextInput>
            </View>
            <View>
                <Button title="Registrarse" onPress={() => doRegister(signupData.email,signupData.password)} disabled={!isFormValid}/>
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

export default Signup;