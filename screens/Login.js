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
            onChangeText={(value) => setState({ ...loginData, email: value })}
          ></TextInput>
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(value) => setState({ ...loginData, password: value })}
          ></TextInput>
        </View>
        <View>
          <Button title="Iniciar sesión" onClick={doLogin} />
          <Button title="Registrarse" onClick={doSignup} />
        </View>
      </ScrollView>
    );
};

export default Login;