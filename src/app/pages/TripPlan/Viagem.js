import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
  } from "react-native";
import styles from "../Home/styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import Mapa from "../Map"

export default function Viagem() {
    const [iniciarPressionado, setIniciarPressionado] = useState(false);
    const [cancelarPressionado, setCancelarPressionado] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <View style={[styles.imageBackground, { flex: 1, minHeight: 300 }]}>
                <Mapa/>
            </View>

            <View style={styles.viagemInfo}>
                <View style={styles.textViagem}>
                    <Text style={styles.title1}>Número</Text>
                    <Text style={styles.subtitle}>Tempo de Chegada</Text>
                    <Text style={styles.subtitle}>Horário de Chegada</Text>
                </View>
                <View style={styles.line2}/>
                <View style={styles.textViagem}>
                    <Text style={styles.viagemContentTitle}>105.2</Text>
                    <Text style={styles.viagemContent}>10 min</Text>
                    <Text style={styles.viagemContent}>17:13</Text>
                </View>
                <View style={styles.line2}/>
                <View style={styles.textViagem}>
                    <Text style={styles.viagemContentTitle}>100.2</Text>
                    <Text style={styles.viagemContent}>39 min</Text>
                    <Text style={styles.viagemContent}>17:16</Text>
                </View>
                <View style={styles.line2}/>
            </View>
            <View style={styles.viagemControl}>
                <TouchableOpacity 
                onPress={() => navigation.navigate("ActiveTrip", {
                  origin: route.params?.origin,
                  destination: route.params?.destination,
                  waypoints: route.params?.waypoints,
                  useCurrentLocation: false,
                })}
                onPressIn={() => setIniciarPressionado(true)}
                onPressOut={() => setIniciarPressionado(false)}
                style={[styles.viagemButton, iniciarPressionado && { backgroundColor: '#0888D8' }]}>
                    <Text style={styles.viagemButtonText}>Iniciar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("Home")} 
                onPressIn={() => setCancelarPressionado(true)}
                onPressOut={() => setCancelarPressionado(false)}
                style={[
                  styles.viagemButton,
                  cancelarPressionado && { backgroundColor: '#007bff' },
                ]}>
                    <Text style={styles.viagemButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}