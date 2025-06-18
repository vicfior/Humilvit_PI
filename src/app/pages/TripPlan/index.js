import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, TextInput, FlatList, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "../Home/styles";
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from "@react-navigation/native";

const ORS_API_KEY = '5b3ce3597851110001cf624843e18197109e4a16a1c5a5ca281e4cca';

export default function TripPlan() {
    /**
    const [text, onChangeText] = React.useState('Origem');
    const [texto, onText] = React.useState('Destino');
    const navigation = useNavigation();
     */

    /*gemini */

    const navigation = useNavigation();

    const [originText, setOriginText] = useState('');
    const [destinationText, setDestinationText] = useState('');
    
    // Estados para armazenar as coordenadas de origem e destino selecionadas
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);

    // Estados para as sugestões da pesquisa de geocodificação
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    const fetchGeocodingSuggestions = async (query, type) => {
        if (query.length < 3) { // Comece a pesquisar com pelo menos 3 caracteres
            if (type === 'origin') setOriginSuggestions([]);
            else setDestinationSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(query)}&size=5`
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
                if (type === 'origin') setOriginSuggestions([]);
                else setDestinationSuggestions([]);
            }
        } catch (error) {
            console.error("Erro ao buscar sugestões de geocodificação:", error);
            Alert.alert("Erro", "Não foi possível buscar sugestões de endereço.");
            if (type === 'origin') setOriginSuggestions([]);
            else setDestinationSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion, type) => {
        if (type === 'origin') {
            setOriginText(suggestion.name);
            setSelectedOrigin({ latitude: suggestion.latitude, longitude: suggestion.longitude });
            setOriginSuggestions([]); // Limpa as sugestões após a seleção
        } else {
            setDestinationText(suggestion.name);
            setSelectedDestination({ latitude: suggestion.latitude, longitude: suggestion.longitude });
            setDestinationSuggestions([]); // Limpa as sugestões após a seleção
        }
    };

    const handleSearchRoute = () => {
        if (!selectedOrigin) {
            Alert.alert("Erro", "Por favor, selecione uma origem válida.");
            return;
        }
        if (!selectedDestination) {
            Alert.alert("Erro", "Por favor, selecione um destino válido.");
            return;
        }

        // Navega para a tela do mapa, passando as coordenadas de origem e destino
        navigation.navigate("Viagem", {
            origin: selectedOrigin,
            destination: selectedDestination,
            useCurrentLocation: false // Indica que a origem veio da pesquisa
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
    {/*} 
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.inputContainer}>
                <Icon name="search" size={20} color="#999" style={styles.iconInput}/>
                <TextInput 
                    style={styles.input}
                    onChangeText={onChangeText}
                    value = {text}
                    placeholder="Origem"
                    placeholderTextColor="#999"
                />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.inputContainer}>
            <Icon name="search" size={20} color="#999" style={styles.iconInput}/>
                <TextInput 
                    style={styles.input}
                    onChangeText={onText}
                    value = {texto}
                    placeholder="Destino"
                    placeholderTextColor="#999"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Viagem")}>
                <View style={styles.buttonTrip}>
                    <Text style={styles.buttonText}>Rotas</Text>
                </View>
            </TouchableOpacity>
        */}

        {/*gemini */}
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
                        placeholder="Origem (endereço ou local)"
                        placeholderTextColor="#999"
                    />
                </View>
                {originSuggestions.length > 0 && (
                    <FlatList
                        data={originSuggestions}
                        keyExtractor={(item) => item.name}
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
                        placeholder="Destino (endereço ou local)"
                        placeholderTextColor="#999"
                    />
                </View>
                {destinationSuggestions.length > 0 && (
                    <FlatList
                        data={destinationSuggestions}
                        keyExtractor={(item) => item.name}
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

        
            <View style={styles.tripContainer}>
                <Text style={styles.textContainer}>Estação mais próxima</Text>
                <View style={styles.line}/>
                <Text style={styles.textContainer1}>Nome da estação</Text>
                <Text style={styles.text}>140m - 3 min a pé</Text>
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
                <View style={styles.bottomTripContainer}>
                    <Text style={styles.textContainer}>Acessos Recentes</Text>  
                    {[1, 2].map((_, i) => (
                    <View key={i}>
                        <Text style={styles.textContainer1}>Local</Text>
                        <Text style={styles.text}>Endereço</Text>
                        <View style={styles.line2} />
                    </View>
                    ))} 
                </View>
        </View>
    </KeyboardAwareScrollView> 
    );
}

