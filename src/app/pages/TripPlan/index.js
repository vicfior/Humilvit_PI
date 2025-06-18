import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, TextInput, FlatList, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "../Home/styles";
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from "@react-navigation/native";

const ORS_API_KEY = '5b3ce3597851110001cf624843e18197109e4a16a1c5a5ca281e4cca';

// --- Coordenadas fornecidas pelo usuário ---
const routeCoordinates = [
    { latitude: -15.839908123167616, longitude: -47.921215295791626 }, // Origem
    { latitude: -15.835266001337718, longitude: -47.914756536483765 }, // Parada 1
    { latitude: -15.833317775013514, longitude: -47.9119697213173 },   // Parada 2
    { latitude: -15.831426300223901, longitude: -47.90930628776551 },  // Parada 3
    { latitude: -15.829475456380685, longitude: -47.906648218631744 }, // Destino
];



export default function TripPlan() {
    const navigation = useNavigation();

    const [originText, setOriginText] = useState('');
    const [destinationText, setDestinationText] = useState('');

    // Estados para armazenar as coordenadas de origem e destino selecionadas
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);

    // Estados para as sugestões da pesquisa de geocodificação
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    // --- Nova função para parsear string de coordenadas (já existente e ok) ---
    const parseCoordinatesString = (text) => {
        const parts = text.split(',').map(s => s.trim());
        if (parts.length === 2) {
            const lat = parseFloat(parts[0]);
            const lon = parseFloat(parts[1]);
            if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                return { latitude: lat, longitude: lon };
            }
        }
        return null;
    };

    const fetchGeocodingSuggestions = async (query, type) => {
                const coords = parseCoordinatesString(query);
                if (coords) {
                    if (type === 'origin') {
                        setSelectedOrigin(coords);
                        setOriginSuggestions([]);
                        setOriginText(query);
                    } else {
                        setSelectedDestination(coords);
                        setDestinationSuggestions([]);
                        setDestinationText(query);
                    }
                    return;
                }

        if (query.length < 3) {
            if (type === 'origin') {
                setOriginSuggestions([]);
                setSelectedOrigin(null);
            } else {
                setDestinationSuggestions([]);
                setSelectedDestination(null);
            }
            return;
        }

        try {
            const response = await fetch(
                `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(query)}&size=5&boundary.country=BR`
            );
            const data = await response.json();

            if (data && data.features && data.features.length > 0) {
                const suggestions = data.features.map(feature => ({
                    name: feature.properties.label,
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                }));
                if (type === 'origin') setOriginSuggestions(suggestions);
                else setDestinationSuggestions(suggestions);
            } else {
                if (type === 'origin') {
                    setOriginSuggestions([]);
                    setSelectedOrigin(null);
                } else {
                    setDestinationSuggestions([]);
                    setSelectedDestination(null);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar sugestões de geocodificação:", error);
            Alert.alert("Erro", "Não foi possível buscar sugestões de endereço.");
            if (type === 'origin') {
                setOriginSuggestions([]);
                setSelectedOrigin(null);
            } else {
                setDestinationSuggestions([]);
                setSelectedDestination(null);
            }
        }
    };

    const handleSelectSuggestion = (suggestion, type) => {
        if (type === 'origin') {
            setOriginText(suggestion.name);
            setSelectedOrigin({ latitude: suggestion.latitude, longitude: suggestion.longitude });
            setOriginSuggestions([]);
        } else {
            setDestinationText(suggestion.name);
            setSelectedDestination({ latitude: suggestion.latitude, longitude: suggestion.longitude });
            setDestinationSuggestions([]);
        }
    };

    // --- Modificada para usar routeCoordinates se os campos estiverem vazios ---
    const handleSearchRoute = () => {
        let origin = selectedOrigin;
        let destination = selectedDestination;
        let waypoints = [];

        if (!origin && !destination) {
            // Se nenhum campo foi preenchido, usa as coordenadas predefinidas
            origin = routeCoordinates[0];
            destination = routeCoordinates[routeCoordinates.length - 1];
            waypoints = routeCoordinates.slice(1, routeCoordinates.length - 1);
        } else {
            // Se pelo menos um campo foi preenchido, usa os valores selecionados
            if (!origin) {
                Alert.alert("Erro", "Por favor, insira ou selecione uma origem.");
                return;
            }
            if (!destination) {
                Alert.alert("Erro", "Por favor, insira ou selecione um destino.");
                return;
            }
        }

        navigation.navigate("Viagem", { // Assumindo que "Viagem" é o nome da sua tela de mapa
            origin: origin,
            destination: destination,
            waypoints: waypoints, // Passa waypoints mesmo que seja o array predefinido
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
                <View style={styles.inputContainer}>
                    <Icon name="search" size={20} color="#999" style={styles.iconInput}/>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setOriginText(text);
                            fetchGeocodingSuggestions(text, 'origin');
                        }}
                        value={originText}
                        placeholder="Origem (endereço, local ou Lat,Lon)"
                        placeholderTextColor="#999"
                    />
                </View>
                {originSuggestions.length > 0 && (
                    <FlatList
                        data={originSuggestions}
                        keyExtractor={(item, index) => item.name + index}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.suggestionItem}
                                onPress={() => handleSelectSuggestion(item, 'origin')}
                            >
                                <Text style={styles.suggestionText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.suggestionsList}
                    />
                )}

                <View style={styles.inputContainer}>
                    <Icon name="search" size={20} color="#999" style={styles.iconInput}/>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setDestinationText(text);
                            fetchGeocodingSuggestions(text, 'destination');
                        }}
                        value={destinationText}
                        placeholder="Destino (endereço, local ou Lat,Lon)"
                        placeholderTextColor="#999"
                    />
                </View>
                {destinationSuggestions.length > 0 && (
                    <FlatList
                        data={destinationSuggestions}
                        keyExtractor={(item, index) => item.name + index}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.suggestionItem}
                                onPress={() => handleSelectSuggestion(item, 'destination')}
                            >
                                <Text style={styles.suggestionText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.suggestionsList}
                    />
                )}

                <TouchableOpacity onPress={handleSearchRoute}>
                    <View style={styles.buttonTrip}>
                        <Text style={styles.buttonText}>Rotas</Text>
                    </View>
                </TouchableOpacity>

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