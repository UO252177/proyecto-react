import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const balance = 10.57;

export default function Balance(){
    return(
        <Card containerStyle={styles.balance}>
            <Text style={styles.stonks}>{balance}€</Text>
        </Card>
    )   
}

export function BalanceLight(){
    return(
        <Card containerStyle={styles.balanceL}>
            <Text style={styles.stonksL}>{balance}€</Text>
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