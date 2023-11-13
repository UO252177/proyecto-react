import React from "react";
import {View, Text, ScrollView, Button} from "react-native";



const Signup = () => {

    const[signupData, setSignupData] = useState({
        email:'',
        name:'',
        phone:'',
        balance: 0,
        password:''
    });

    const doRegister = () => {
        props.navigation.navigate('Home');
    };

    return(
        <ScrollView>
            <Text>Registrarse</Text>
            <View>
                <Text>Nombre:</Text>
                <TextInput placeholder="Nombre" onChangeText={(value) => setState({ ...signupData, name: value })}></TextInput>
            </View>
            <View>
                <Text>Email:</Text>
                <TextInput placeholder="Email" onChangeText={(value) => setState({ ...signupData, email: value })}></TextInput>
            </View>
            <View>
                <Text>Teléfono:</Text>
                <TextInput placeholder="Número de teléfono" onChangeText={(value) => setState({ ...signupData, phone: value })}></TextInput>
            </View>
            <View>
                <Text>Password:</Text>
                <TextInput secureTextEntry={true} onChangeText={(value) => setState({ ...signupData, password: value })}></TextInput>
            </View>
            <View>
                <Text>Repita el password:</Text>
                <TextInput secureTextEntry={true}></TextInput>
            </View>
            <View>
                <Button title="Registrarse" onPress={doRegister} />
            </View>
        </ScrollView>
    );
};

export default Signup;