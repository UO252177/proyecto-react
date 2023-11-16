import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {query, collection, where, getDocs, setDoc, getDoc, doc} from "@firebase/firestore";
import {firestore} from "../database/firebase";

export default function Escrutador(){

    const escrutar = async () => {
        try {
            // Recorre los partidos y comprueba los que han finalizado
            const collectionRef = collection(firestore, "partidos");
            // Para cada partido finalizado:
            const q = query(collectionRef, where("finalizado", "==", true));
            
            await getDocs(q)
                .then( async (partidos) => {
                    partidos.forEach((partido) => {
                    // Obtiene la lista de apuestas
                    const apuestas = partido.data().apuestas;
                    apuestas.forEach((apuestaId) => {                        
                        const query2 = doc(firestore, "apuestas", apuestaId);
                            getDoc(query2).then(async (apuesta) => {
                                if (!apuesta.data().isGanado) {
                                    //Para cada apuesta, compara el ganador con el de la apuesta
                                    if (apuesta.data().ganador === partido.data().ganador) {
                                    //Poner a true isGanado
                                    await setDoc(doc(firestore, "apuestas", apuestaId), {isGanado: true}, {merge: true});
                                    //Multiplica la cantidad de la apuesta por la ratio
                                    console.log(partido.data().participantes, "ganador -->" + apuesta.data().ganador);
                                    const ratio = partido.data().participantes[apuesta.data().ganador];                               
                                    const cantidadGanada = apuesta.data().cantidadApuesta * ratio;
                                    console.log(ratio, cantidadGanada);
                                    // Y lo añade al balance del usuario
                                    await (getDoc(doc(firestore,"users", apuesta.data().idUsuario))).then(async(user) => {
                                        const newBalance = user.data().balance + cantidadGanada;
                                        await setDoc(doc(firestore, "users", user.id),{balance: newBalance}, {merge:true});
                                    })
                                }
                            }
                        })
                    })
                })  
            });
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <TouchableOpacity onPress={() => escrutar()} style={styles.button}>
            <Text style={styles.text}>Escrutar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        padding: 5,
        margin: 3,
        backgroundColor: '#8bc999',
        borderRadius: 8,
        alignItems: 'center',
        flex: 1
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkslategray',
        marginBottom: 1,
    }
});