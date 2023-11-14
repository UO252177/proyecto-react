import * as React from 'react';
import * as RN from 'react-native';
import { Card } from 'react-native-elements';
import { firestore } from '../database/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input'

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

    const apostar = () => {
        // Coger id de usuario

        // Comprobar si el usuario ya ha apostado el partido

        // Comprobar que la cantidad no supere el balance del usuario

        // Crear una apuesta en la base de datos

        setModalVisible(!modalVisible);
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
                        <RN.TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                            <RN.Text>Apostar</RN.Text>
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
        padding: 10,
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
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
        marginVertical: 10,
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