import { StyleSheet, Text, View, TextInput, Button, ScrollView } from'react-native';
import React, {useState, setState} from 'react';

import { firestore } from '../database/firebase';
import {addDoc, collection} from '@firebase/firestore';

const CreateUserScreen = (props) => {
    const[state, setState] = useState({
        name:'',
        email:'',
        phone:''
    })

    const saveNewUser = ()=> {
        console.log(state);
        if(state.name === ''){
            alert('Name is required');
        } else {
            const ref=collection(firestore, 'users');
            try{
                addDoc(ref, state);
            } catch(err){
                console.log(err);
            }
            alert('User created successfully');
            props.navigation.navigate('UsersList');
        }
    }

    return(
        <ScrollView>
            <View style={styles.inputGroup}>
                <Text>Crear Usuario</Text>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Nombre' onChangeText={(value)=>setState({...state,name:value})}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Email' onChangeText={(value)=>setState({...state,email:value})}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Telefone' onChangeText={(value)=>setState({...state,phone:value})}/>
            </View>

            <View>
                <Button title='Guardar Usuario' onPress={saveNewUser}/>
            </View>
        </ScrollView>
    )
}



const styles=StyleSheet.create({
    container:{
        flex: 1, 
        padding: 35
    },
    inputGroup:{
        flex: 1, 
        padding: 0,
        marginBottom: 15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    }
})

export default CreateUserScreen;