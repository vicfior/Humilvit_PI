import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const image = require("../../../images/Mapa.png");

export default function Home() {
    return (
        <View style={styles.container}> 
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                
                <View style={styles.notificationContainer}>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Icon name="notifications-circle-outline" size={35} style={styles.iconNotification}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <View>
                        <TouchableOpacity style={styles.lineIndicatior}></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.planTripButton}>
                        <Icon name="search" size={20} color="#999" style={styles.icon}/>
                        <Text style={styles.buttonText}>Planeje uma viagem</Text>
                    </TouchableOpacity>
                </View>
            
            </ImageBackground>
        </View>
    );  
}

const styles = StyleSheet.create({
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
        marginLeft: 10,
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
    }
});