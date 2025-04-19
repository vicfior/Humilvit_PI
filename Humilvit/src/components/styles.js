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
        color: '#aaa',
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

    //Notification
    drawer: {
        flex: 1,
        backgroundColor: '#2F2E2E',
    },
    drawerHeader: {
        flexDirection: 'row',
        padding: 18,
        backgroundColor: '#2F2E2E',
        alignItems: 'center',
    },
    drawerHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 40,
        color: '#0888D8',
    },
    lineIndicatorDrawer: {
        width: 277,
        height: 1.5,
        borderRadius: 3,
        backgroundColor: '#555555',
        alignSelf: 'center',
        marginTop: -8,
    },
    iconNotificationDrawer: {
        color: '#0888D8',
        paddingTop: 40,
        marginRight: 7,
    },
    drawerBodyText: {
        fontSize: 15,
        fontWeight: '450',
        color: 'white',
        alignSelf: 'left',
        marginLeft: 20,
        marginTop: 20,
    },
    drawerButtons: {
        flexDirection: 'row',
    },
    buttonOn: {
        backgroundColor: '#555555',
        padding: 13,
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        fontWeight: '400',

    },
    buttonOff: {
        backgroundColor: '#555555',
        padding: 13,
        borderRadius: 10,    
        width: 100,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    lineIndicatorDrawer2: {
        width: 277,
        height: 1.5,
        borderRadius: 3,
        backgroundColor: '#555555',
        alignSelf: 'center',
        marginTop: 25,
    },
    switchContainer: {
        flexDirection: 'row',
    },
    switchLarge: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
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
        height:'715'
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

    }
});