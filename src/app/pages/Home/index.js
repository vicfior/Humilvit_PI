import React, { useRef, useCallback, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    DrawerLayoutAndroid,
    Modal,
    Animated,
    PanResponder
  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
//páginas
import styles from "./styles";
import Notification from "../Notification";
import TripPlan from "../TripPlan"
import Mapa from "../Map"

const image = require("../../../images/Mapa.png");

export default function Home({navigation}) {
    
    const drawerRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const panY = useRef(new Animated.Value(0)).current;
    
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

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(panY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }).start();
    };

    const closeModal = () => {
        Animated.timing(panY, {
          toValue: 500,
          duration: 400,
          useNativeDriver: true
        }).start(() => setModalVisible(false));
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
          if (gesture.dy > 0) panY.setValue(gesture.dy);
        },
        onPanResponderRelease: (e, gesture) => {
          if (gesture.dy > 50) {
            closeModal();
          } else {
            Animated.spring(panY, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        }
    });


    const renderNavigationView = useCallback(() => (
    <Notification onClose={closeDrawer} />
    ), []);
    
    return (
        <>
            <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={renderNavigationView}
            >
                <View style={styles.container}>
                    <View style={styles.imageBackground}>
                        <Mapa/>
                    </View>
                        <View style={styles.notificationContainer}>
                            <TouchableOpacity style={styles.notificationButton} onPress={openDrawer}>
                                <Icon name="notifications-circle-outline" size={35} style={styles.iconNotification}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomContainer}>
                            <TouchableOpacity  style={styles.lineIndicatior}></TouchableOpacity>
                            <TouchableOpacity  style={styles.planTripButton} onPress={openModal}>
                                <Icon name="search" size={20} color="#999" style={styles.icon}/>
                                <Text style={styles.buttonText}>Planeje uma viagem</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </DrawerLayoutAndroid>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="none"
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={closeModal}
                    />
                    <Animated.View
                        style={[styles.modal, { transform: [{ translateY: panY }] }]}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.modalStyle} />
                        <TripPlan />
                    </Animated.View>
                </View>
            </Modal>
        </>

        
    );  
}