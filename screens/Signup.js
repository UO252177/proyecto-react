import {React, useState} from "react";
import {View, Text, ScrollView, Button, TextInput} from "react-native";



const Signup = ({ navigation }) => {

    const[signupData, setSignupData] = useState({
        email:'',
        name:'',
        phone:'',
        balance: 0,
        password:''
    });

    const doRegister = () => {
        navigation.navigate('Categories');
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