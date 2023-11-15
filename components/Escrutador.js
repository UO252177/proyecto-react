import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Escrutador() {

    const[partidos, setPartidos] = React.useState([]);
    
    const escrutar = () => {
        // Recorre los partidos y comprueba los que han finalizado
        const collectionRef = collection(firestore, "partidos");
        const q = query(collectionRef, where("finalizado", "==", true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setPartidos(
                querySnapshot.docs.map((doc) => ({
                  key: doc.id,
                  id: doc.id,
                  nombre: doc.data().nombre,
                  fechaFin: doc.data().fechaFin,
                  fechaInicio: doc.data().fechaInicio,
                  isFinalizado: doc.data().finalizado,
                  participantes: doc.data().participantes,
                  categoria: doc.data().categoria,
                  ganador: doc.data().ganador
                }))
              );
            });

            partidos.map((partido) => (
                console.log(partido.id)
                ));
        

        // Para cada partido finalizado:
        // Obtiene la lista de apuestas

        // Para cada apuesta:
        // Compara el ganador con el de la apuesta

        // Si coinciden, multiplica la cantidad de la apuesta por la ratio

        // Y lo añade al balance del usuario
    }


    return(
        <TouchableOpacity onPress={() => escrutar()} style={styles.button}>
            <Text style={styles.text}>Escrutar</Text>
        </TouchableOpacity>
    );
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
        color: 'darkslategrey',
        marginBottom: 1,
    }
});