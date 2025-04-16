import React, { useRef } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, DrawerLayoutAndroid } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../../../components/styles";
import Notification from "../Notification";

const image = require("../../../images/Mapa.png");

export default function Home({navigation}) {
    const drawerRef = useRef(null);
    const openDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.openDrawer();
        }
    };

    const closeDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.closeDrawer();
        }
    };

    //renderiza o drawer
    const renderNavigationView = () => (
        <Notification onClose={closeDrawer} />
    );
    return (

        <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={renderNavigationView}
        >
            <View style={styles.container}> 
                <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                    
                    <View style={styles.notificationContainer}>
                        <TouchableOpacity style={styles.notificationButton} onPress={openDrawer}>
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
        </DrawerLayoutAndroid>
    );  
}