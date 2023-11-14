import * as React from 'react';
import * as RN from 'react-native';
import { Card } from 'react-native-elements';
import { firestore } from '../database/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function Partido({
    id,
    categoria,
    nombre,
    fechaFin,
    fechaInicio,
    finalizado,
    participantes,
    ratios,
    ganador
}) {

    const onDelete = () => {
        // const docRef = doc(firestore, 'partidos', id);
        // deleteDoc(docRef);
    }

    const onEdit = () => {
        // const docRef = doc(firestore, 'partidos', id);
        // updateDoc(docRef, {
        //     finalizado: true,
        // });
    }

    return(
        <RN.View>
            <Card>
            <RN.View style={styles.productContainer}>
                <RN.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <RN.Text style={styles.name}>{nombre}</RN.Text>
                </RN.View>
                {participantes.map((participante) => (
                    <RN.Text style={styles.parts}>{participante}</RN.Text>
                    ))}
                {ratios.map((ratio) => (
                    <RN.Text style={styles.price}>{ratio}</RN.Text>
                    ))} 
                {/* {isSold ? (
                    <RN.TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'gray'}]}>
                    <RN.Text style={styles.buttonText}>Sold</RN.Text>
                </RN.TouchableOpacity>
                )
                : (
                    <RN.TouchableOpacity 
                    onPress={onEdit}
                    style={styles.button}>
                    <RN.Text style={styles.buttonText}>Purchase</RN.Text>
                </RN.TouchableOpacity>
                )} */}
                
            </RN.View>
            </Card>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    parts: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'darkslategray',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});