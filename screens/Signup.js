import React from "react";
import {View, Text, ScrollView, Button} from "react-native";



const Signup = () => {

    const doRegister = () => {
        props.navigation.navigate('Home');
    };

    return(
        <ScrollView>
            <Text>Inicio de sesión</Text>
            <View>
                <Text>Email:</Text>
                <TextInput placeholder="Email"></TextInput>
            </View>
            <View>
                <Text>Password:</Text>
                <TextInput secureTextEntry={true} placeholder="Password"></TextInput>
            </View>
            <View>
                <Button title="Registrarse" onPress={doRegister} />
            </View>
        </ScrollView>
    );
};

export default Signup;