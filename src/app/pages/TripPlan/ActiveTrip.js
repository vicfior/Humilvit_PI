import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../Home/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Mapa from '../Map';
import * as Haptics from 'expo-haptics';


function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Raio da Terra em metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function ActiveTrip() {
    const navigation = useNavigation();
    const route = useRoute();
    const { origin, destination, waypoints } = route.params || {};

    const totalParadas = (waypoints ? waypoints.length : 0) + 1;
    const [contador, setContador] = useState(totalParadas);
    const [imagemIndex, setImagemIndex] = useState(0);
    const [currentOrigin, setCurrentOrigin] = useState(origin);
    const [paradasRestantes, setParadasRestantes] = useState(
      waypoints ? [...waypoints, destination] : [destination]
    );
    const chegouRef = useRef(false);

    const handleOriginChange = (newOrigin) => {
      setCurrentOrigin(newOrigin);
    };
    useEffect(() => {
      if (!currentOrigin || !paradasRestantes.length || chegouRef.current) return;
      const proximaParada = paradasRestantes[0];
      const dist = getDistanceFromLatLonInMeters(
        currentOrigin.latitude,
        currentOrigin.longitude,
        proximaParada.latitude,
        proximaParada.longitude
      );
      if (dist < 70) { 
        setParadasRestantes(prev => prev.slice(1));
        setContador(prev => prev - 1);
      }
    }, [currentOrigin, paradasRestantes]);

    
    useEffect(() => {
      if (contador === 0 && !chegouRef.current) {
        chegouRef.current = true;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    }, [contador]);

    useEffect(() => {
    
      if (contador > 0) chegouRef.current = false;
    }, [contador]);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Mapa
            origin={origin}
            destination={destination}
            waypoints={waypoints}
            onOriginChange={handleOriginChange}
          />
        </View>

        {contador > 0 ? (
          <View style={styles.contadorArea}>
            <Text style={styles.contadorTextoLabel}>Faltam</Text>
            <Text style={[styles.contadorTextoNumero, contador <= 2 && { color: '#A71919' }]}> 
              {contador < 10 ? `0${contador}` : contador}
            </Text>
            <Text style={styles.contadorTextoParadas}>Paradas</Text>
          </View>
        ) : (
          <View style={styles.contadorArea}>
            <Text style={styles.chegouTexto}>A sua parada destino é essa</Text>
            <Text style={styles.chegouTextoFinal}>CHEGOU 🎉</Text>
          </View>
        )}
      </View>
    );
}
