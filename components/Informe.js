import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Modal, ScrollView } from "react-native";
import { Card } from 'react-native-elements';
import { query, collection, where, getDocs, setDoc, getDoc, doc } from "@firebase/firestore";
import { firestore } from "../database/firebase";

export default function Informe() {
    const [modalVisible, setModalVisible] = useState(false);
    const [ganadores, setGanadores] = useState([]);
  
    const generarInforme = async () => {
      try {
        const collectionRef = collection(firestore, "apuestas");
        const q = query(collectionRef, where("isGanado", "==", true));
        const apuestas = await getDocs(q);
  
        const nuevosGanadores = [];
  
        for (const apuesta of apuestas.docs) {
          const user = await getDoc(doc(firestore, "users", apuesta.data().idUsuario));
          const userEmail = user.data().email;
          const res = `${userEmail} - ${parseFloat(apuesta.data().cantidadApuesta)}€`;
          nuevosGanadores.push(res);
        }
  
        setGanadores(nuevosGanadores);
        setModalVisible(true);kf
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <View>
        <TouchableOpacity
          onPress={() => generarInforme()}
          style={styles.button}
        >
          <Text style={styles.text}>Ver informe</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Ganadores de apuestas:</Text>
              <ScrollView>
                {ganadores.map((user, index) => (
                  <Card key={index} containerStyle={styles.apuestaContainer}>
                    <Text key={index}>{user}</Text>
                  </Card>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalStyle}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'darkslategray',
        marginBottom: 10,
    },
    apuestaContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 12,
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
        padding: 5,
        margin: 3,
        backgroundColor: '#8bc999',
        borderRadius: 8,
        alignItems: 'center',
        flex: 1
   },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkslategrey',
        marginBottom: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalButton: {
        borderRadius: 10,        
        marginTop: 17,
        marginHorizontal: 10,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: '#cf485a',
      },
      buttonBet: {
        backgroundColor: '#8bc999',
      },
      modalStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
      },
      text:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkslategray',
        marginBottom: 1,
    }
});