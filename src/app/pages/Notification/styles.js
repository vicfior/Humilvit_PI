import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
});