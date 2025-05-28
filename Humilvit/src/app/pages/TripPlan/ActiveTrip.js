import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../Home/styles'; // Se estiver usando um styles central
import { useNavigation } from '@react-navigation/native';

const imagensParadas = [
    require('../../../images/parada.png'),
    require('../../../images/parada1.png'),
    require('../../../images/parada2.png'),
    require('../../../images/parada3.png'),
    require('../../../images/parada4.png'),
    require('../../../images/parada5.png'),
    require('../../../images/parada6.png'),
    require('../../../images/parada7.png'),
    require('../../../images/parada8.png'),
    require('../../../images/Chegada.png')
];

export default function ActiveTrip() {

    const [contador, setContador] = useState(9); // número total de paradas
    const [imagemIndex, setImagemIndex] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        if (contador > 0) {
          const timer = setTimeout(() => {
            setContador(prev => prev - 1);
            setImagemIndex(prev => Math.min(prev + 1, imagensParadas.length - 1));
          }, 2700); // muda a cada 2 segundos (você pode ajustar esse tempo)
          return () => clearTimeout(timer);
        }
      }, [contador]);
    
      return (
        <View style={styles.container}>
          <Image source={imagensParadas[imagemIndex]} style={styles.mapaImagem} />
    
          {contador > 0 ? (
            <View style={styles.contadorArea}>
              <Text style={styles.contadorTextoLabel}>Faltam</Text>
              <Text style={[styles.contadorTextoNumero, contador <= 2 && { color: '#A71919' }]}>
                {contador < 9 ? `0${contador}` : contador}
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
