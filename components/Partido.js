import * as React from 'react';
import * as RN from 'react-native';
import { Card } from 'react-native-elements';
import { firestore } from '../database/firebase';
import NumericInput from 'react-native-numeric-input'
import { useAuth } from '../components/AuthContext';
import { doc, addDoc, updateDoc, collection, Timestamp, getDoc, setDoc } from 'firebase/firestore';

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

    const [modalVisible, setModalVisible] = React.useState(false);
    const [cantidad, setCantidad] = React.useState(0);
    const [part, setPart] = React.useState(null);

    const { user, updateBalance } = useAuth();

    const lanzaModal = (participante) => {

      setPart(participante);

      setModalVisible(true)
    }

    const showToastWithGravity = () => {
      RN.ToastAndroid.showWithGravity(
        'Apuesta realizada',
        RN.ToastAndroid.LONG,
        RN.ToastAndroid.BOTTOM
      );
    };

    const apostar = async () => {
      // Crear una apuesta en la base de datos
      await addDoc(collection(firestore, "apuestas"), {
        cantidadApuesta: cantidad,
        categoria: categoria,
        fecha: Timestamp.now(),
        ganador: part,
        idPartido: id,
        idUsuario: user.id,
        isGanado: false
      }).then(async (apuesta) => {
       // Añadir la apuesta al partido
        const snapApuesta = await getDoc(apuesta);
        const snapPartido = await getDoc(doc(firestore, "partidos", snapApuesta.data().idPartido));
        
        if (snapPartido.exists()) {
          const partidoDetails = {
            // idPartido: apuesta.idPartido,
            // categoria: snapPartido.data().categoria,
            // nombre: snapPartido.data().nombre,
            // fechaFin: snapPartido.data().fechaFin,
            // fechaInicio: snapPartido.data().fechaInicio,
            // finalizado: snapPartido.data().finalizado,
            // participantes: snapPartido.data().participantes,
            // ganador: snapPartido.data().ganador,
            apuestas: [...snapPartido.data().apuestas, apuesta.id]
          }

          await setDoc(doc(firestore, "partidos", snapApuesta.data().idPartido), {apuestas: partidoDetails.apuestas}, {merge: true});

        }})

      // Quitar dinero al usuario (lo que nos gusta)
      const docRef = doc(firestore, "users", user.id);
      await updateDoc(docRef, { balance: user.balance - cantidad });

      // Actualizar contexto
      updateBalance(user.id, "users");

      setModalVisible(!modalVisible);
      showToastWithGravity();
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
                        <RN.Text style={styles.ratio}>1:{participante.ratio}</RN.Text>
                        <RN.TouchableOpacity style={styles.button} onPress={() => lanzaModal(participante.nombre)}>
                            <RN.Text style={styles.buttonText}>Apostar</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                    ))}
                </RN.View>
            </RN.View>
            </Card>

        <RN.Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <RN.View style={styles.centeredView}>
          <RN.View style={styles.modalView}>
          <NumericInput containerStyle={''}
            placeholder="Cantidad"
            onChange={(value) =>
              setCantidad(value)
            }
            valueType='real'
            rounded={true}
            totalWidth={195}
            totalHeight={50}
            minValue={0}
            maxValue={user.balance}
            rightButtonBackgroundColor={'lightsteelblue'}
            leftButtonBackgroundColor={'lightsteelblue'}
          ></NumericInput>
            <RN.View style={{flexDirection: 'row'}}>
            <RN.TouchableOpacity
              style={[styles.modalButton, styles.buttonBet]}
              onPress={() => apostar()}>
              <RN.Text style={styles.modalStyle}>Apostar</RN.Text>
            </RN.TouchableOpacity>
            <RN.TouchableOpacity
              style={[styles.modalButton, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <RN.Text style={styles.modalStyle}>Cancelar</RN.Text>
            </RN.TouchableOpacity>
            </RN.View>
          </RN.View>
        </RN.View>
      </RN.Modal>

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
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
        fontSize: 18
      }
});