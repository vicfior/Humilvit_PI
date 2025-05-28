import { StyleSheet } from "react-native";

export default StyleSheet.create({
    //Home
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    notificationContainer: {
        position: 'absolute',
        top: 40,
        left: 6,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F2E2E', 
        width: 55,
        height: 55,
        borderRadius: 13,
        zIndex: 1, //para ficar em cima do mapa sempre
    },
    iconNotification: {
        color: '#0888D8',
        
    },
    notificationButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    bottomContainer: {
        padding: 30,
        backgroundColor: '#2F2E2E',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    planTripButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#555555',
        padding: 15,
        borderRadius: 25,
        width: 315,
        alignSelf: 'center',
        marginTop: 15,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    lineIndicatior: {
        alignSelf: 'center',
        width: 75,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#555555',
        marginBottom: 10,
        marginTop: -13,
    },
    bottomNotContainer: {
        flexDirection: 'column',
        backgroundColor: '#2F2E2E',
        width: 300,
    },

    //PlanTrip
    modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2F2E2E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: 200, // ou um valor base
        maxHeight: '90%',
    },
    modalStyle: {
        width: 77,
        height: 5,
        backgroundColor: '#555555',
        alignSelf: 'center',
        borderRadius: 3,
        marginBottom: 10
    },

    textTrip: {
        color: '#FFFFFF',
    },
    input: {
        color: '#FFFFFF',
        marginLeft: 6,
        width: 200
    },
    inputContainer: {
        backgroundColor: '#555555',
        borderRadius: 25,
        padding: 5,
        marginTop: 10,
        marginBottom: 2,
        flexDirection: 'row',
        width: 321,
        alignSelf: 'center',
    },
    iconInput: {
        marginTop: 10,
        marginRight: -3,
        marginLeft: 10,
    },
    buttonTrip: {
        backgroundColor: 'rgb(8, 136, 216)',
        padding: 7,
        width:70,
        borderRadius: 15,
        height: 32,
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 25,
        marginTop: 10
    },
    tripContainer: {
        backgroundColor: '#212121',
        width: 321,
        height: 300,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 2,
        alignSelf: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#555555',
        width: 321,
        marginTop: 10
    },
    textContainer: {
        marginTop: 15,
        marginLeft: 20,
        color: "#606060"
    },
    textContainer1: {
        marginTop: 15,
        marginLeft: 20,
        color: "#0888D8",
        fontWeight: 'bold'
    },
    text: {
        marginTop: 2,
        marginLeft: 20,
        color: "#ffffff"
    },
    lineShort: {
        height: 1,
        backgroundColor: '#555555',
        width: 290,
        marginTop: 10,
        alignSelf: 'center'
    },
    title: {
        color: "#0888D8",
        fontWeight: 'bold',
        marginTop: 2,
    },
    textInfo: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 20
    },
    lineShort1: {
        height: 1,
        backgroundColor: '#555555',
        width: 290,
        alignSelf: 'center',
        marginTop: -10,
    },
    bottomTripContainer: {
        backgroundColor: '#212121',
        width: '100%',
        height: 200,
        alignSelf: 'center',
        marginTop: 25,
    },
    line2: {
        height: 1,
        backgroundColor: '#555555',
        width: 320,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: -5,
    },
    containerScroll: {
        flex: 1,
        backgroundColor: '#2F2E2E',
        width: 357,
        alignSelf: 'center',
    },
    viagemInfo: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#212121',
        width: 360,
        height: 245,
    },  
    textViagem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 15
    },
    title1: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#0888D8',
        fontSize: 14,
    },
    subtitle: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 14,
    },
    viagemContent: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        marginTop: 5
    },
    viagemContentTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#0888D8',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5
    },
    viagemControl: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    viagemButton: {
        backgroundColor: '#2F2E2E',
        padding: 17,
        width: 110,
        borderRadius: 15,
        height: 55,
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    viagemButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    },
    mapaImagem: {
        width: '100%',
        height: '80%',
        resizeMode: 'cover',
      },
      contadorArea: {
        backgroundColor: '#212121',
        width: '100%',
        padding: 20,
        alignItems: 'center',
        height: 300,
      },
      contadorTextoLabel: {
        color: '#ccc',
        fontSize: 16,
      },
      contadorTextoNumero: {
        fontSize: 48,
        color: '#0888D8', // azul
        fontWeight: 'bold',
      },
      contadorTextoParadas: {
        color: '#ccc',
        fontSize: 16,
      },
      chegouTexto: {
        color: '#ccc',
        fontSize: 16,
      },
      chegouTextoFinal: {
        fontSize: 36,
        color: '#0888D8',
        fontWeight: 'bold',
      },
});