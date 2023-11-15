import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { useAuth } from '../components/AuthContext';

export default function Balance(){

    const { user } = useAuth();
    console.log(user);

    return(
        <Card containerStyle={styles.balance}>
            <Text style={styles.stonks}>{user.balance}€</Text>
        </Card>
    )   
}

export function BalanceLight(){
    const { user } = useAuth();
    console.log(user.balance);
    return(
        <Card containerStyle={styles.balanceL}>
            <Text style={styles.stonksL}>{user.balance}€</Text>
        </Card>
    )   
}

const styles = StyleSheet.create({
    balance: {
        backgroundColor: 'darkslateblue',
        borderRadius: 30,
    },
    balanceL: {
        backgroundColor: '#faf2d4',
        borderRadius: 30,
    },
    stonks: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#faf2d4',
    },
    stonksL: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'darkslateblue',
    },
});