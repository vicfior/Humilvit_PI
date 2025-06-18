import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "../Home/styles";

import { useNavigation } from "@react-navigation/native";

const ORS_API_KEY = '5b3ce3597851110001cf624843e18197109e4a16a1c5a5ca281e4cca';

export default function TripPlan() {
    const navigation = useNavigation();

    // --- Coordenadas fornecidas pelo usuário ---

const routeCoordinates = [
    { latitude: -15.839908123167616, longitude: -47.921215295791626 }, // Origem
    { latitude: -15.835266001337718, longitude: -47.914756536483765 }, // Parada 1
    { latitude: -15.833317775013514, longitude: -47.9119697213173 },   // Parada 2
    { latitude: -15.831426300223901, longitude: -47.90930628776551 },  // Parada 3
    { latitude: -15.829475456380685, longitude: -47.906648218631744 }, // Destino
];

const routeCoordinatesA = [
    {latitude: -15.832832650835005, longitude: -47.9214084148407},
    {latitude: -15.831418558817305, longitude: -47.919477224349976},
    {latitude: -15.827816192100386, longitude: -47.91438102722169},
    {latitude: -15.823862804584472, longitude: -47.90897369384766},
    {latitude: -15.819960952065117, longitude: -47.90358781814575},
    {latitude: -15.816007410947812, longitude: -47.89820194244385},
];

const routeCoordinatesB = [ 
    {latitude: -15.798721374139248, longitude: -47.885305881500244},
    {latitude: -15.80183906051414, longitude: -47.887033224105835}, 
    {latitude: -15.805395435523371, longitude: -47.88980126380921}, 
    {latitude: -15.810154376602298, longitude: -47.89414107799531},  
    {latitude: -15.814531264815576, longitude: -47.89888858795166},   
    {latitude: -15.818634511506804, longitude: -47.90436565876008}, 
    {latitude: -15.822474455638066, longitude: -47.909719347953796}, 
];


    // --- Funções para cada rota específica ---
    const handleSearchRoute01 = () => {
        const origin = routeCoordinates[0];
        const destination = routeCoordinates[routeCoordinates.length - 1];
        const waypoints = routeCoordinates.slice(1, routeCoordinates.length - 1);

        navigation.navigate("Viagem", {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            useCurrentLocation: false
        });
    };

    const handleSearchRoute02 = () => {
        const origin = routeCoordinatesA[0];
        const destination = routeCoordinatesA[routeCoordinatesA.length - 1];
        const waypoints = routeCoordinatesA.slice(1, routeCoordinatesA.length - 1);

        navigation.navigate("Viagem", {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            useCurrentLocation: false
        });
    };

    const handleSearchRoute03 = () => {
        const origin = routeCoordinatesB[0];
        const destination = routeCoordinatesB[routeCoordinatesB.length - 1];
        const waypoints = routeCoordinatesB.slice(1, routeCoordinatesB.length - 1);

        navigation.navigate("Viagem", {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            useCurrentLocation: false
        });
    };

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            extraScrollHeight={30}
            style={styles.containerScroll}
        >
            <View style={{ flex: 1 }}>
                {/* Opções de Rotas */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={handleSearchRoute01}>
                        <View style={styles.optionButton}>
                            <Text style={styles.optionText}>Rota 01</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={handleSearchRoute02}>
                        <View style={styles.optionButton}>
                            <Text style={styles.optionText}>Rota 02</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={handleSearchRoute03}>
                        <View style={styles.optionButton}>
                            <Text style={styles.optionText}>Rota 03</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Restante do seu código para as informações de estação e ônibus */}
                <View style={styles.tripContainer}>
                    <Text style={styles.textContainer}>Estação mais próxima</Text>
                    <View style={styles.line}/>
                    <Text style={styles.textContainer1}>Nome da estação</Text>
                    {/* Removi a linha que causava o erro */}
                    <View style={styles.lineShort}/>
                    {[1, 2, 3].map((_, i) => (
                        <View key={i}>
                            <View style={styles.textInfo}>
                                <Text style={styles.title}>Num Onibus</Text>
                                <Text style={styles.text}>Destino</Text>
                                <Text style={styles.text}>Tempo</Text>
                            </View>
                            <View style={styles.lineShort1}/>
                        </View>
                    ))}
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}