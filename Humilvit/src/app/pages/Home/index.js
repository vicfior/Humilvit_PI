import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../../../components/styles";

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

                    <TouchableOpacity style={styles.lineIndicatior}></TouchableOpacity>
                    <TouchableOpacity style={styles.planTripButton}>
                        <Icon name="search" size={20} color="#999" style={styles.icon}/>
                        <Text style={styles.buttonText}>Planeje uma viagem</Text>
                    </TouchableOpacity>
                </View>
            
            </ImageBackground>
        </View>
    );  
}