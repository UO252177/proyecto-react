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
            <Card containerStyle={styles.partidoContainer}>
            <RN.View>
                <RN.View style={{justifyContent: 'space-between'}}>
                    <RN.Text style={styles.name}>{nombre}</RN.Text>
                </RN.View>
                <RN.View style={{flexDirection: 'column', justifyContent: 'center'}}>
                {participantes.map((participante) => (
                    <RN.View style={{flexDirection: 'row'}}>
                        <RN.Text style={styles.parts}>{participante.nombre}</RN.Text>
                        <RN.Text style={styles.ratio}>{participante.ratio}</RN.Text>
                        <RN.TouchableOpacity style={styles.button}>
                            <RN.Text>Apostar</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                    ))}
                </RN.View>
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
    partidoContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 12,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    parts: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'darkslategray',
        flex: 3
    },
    ratio: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
        flex: 1
    },
    button: {
        padding: 10,
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});