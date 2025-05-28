import React, { useEffect, useState, useRef } from "react";
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

import styles from "./styles";

//Bibliotecas dos mapas
import MapView, { Marker } from 'react-native-maps';
import { 
    requestForegroundPermissionsAsync, //pedir permissão
    getCurrentPositionAsync, //pegar a localização atual
    watchPositionAsync,
    LocationAccuracy, //pegar observar a posição 
 } from 'expo-location';

const Mapa = () => {

    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null); 
    const mapRef = useRef(null);
 
    useEffect(() => {
        async function loadLocation() {
            const { granted } = await requestForegroundPermissionsAsync();
            if (granted) {
                const currentPosition = await getCurrentPositionAsync();
                const coords = currentPosition.coords;
                const initialRegion = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                };

                setLocation({ latitude: coords.latitude, longitude: coords.longitude });
                setRegion(initialRegion);
            }
        }

        loadLocation();
    }, []);

    const handleRegionChangeComplete = (newRegion) => {
        setRegion(newRegion);
        setLocation({ latitude: newRegion.latitude, longitude: newRegion.longitude });
    };

    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
        setRegion((prevRegion) => ({
        ...prevRegion,
        latitude,
        longitude,
        }));
    };
    
    return (
        <View style={styles.container}>

            {   
                location &&
                <MapView 
                    style={styles.map}
                    initialRegion={region}
                    onRegionChangeComplete={handleRegionChangeComplete}
                >
                    <Marker
                        coordinate={location}
                        draggable
                        onDragEnd={handleMarkerDragEnd}
                    />
                </MapView>
            }
        </View>
    );
}

export default Mapa;