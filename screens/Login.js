import { React, useState } from "react";
import {View, ScrollView, Text, TextInput, Button } from "react-native";

const Login = (props) => {

    const[loginData, setLoginData] = useState({
        email:'',
        password:''
    });

    const doLogin = () => {
        props.navigation.navigate("Home");
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
            onChangeText={(value) => setLoginData({ ...loginData, email: value })}
          ></TextInput>
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(value) => setLoginData({ ...loginData, password: value })}
          ></TextInput>
        </View>
        <View>
          <Button title="Iniciar sesión" onPress={doLogin} />
          <Button title="Registrarse" onPress={doSignup} />
        </View>
      </ScrollView>
    );
};

export default Login;