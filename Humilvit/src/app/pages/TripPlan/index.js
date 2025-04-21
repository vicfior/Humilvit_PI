import React from "react";
import { View, Text, TouchableOpacity, Platform, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "../../../components/styles";
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from "@react-navigation/native";

export default function TripPlan() {

    const [text, onChangeText] = React.useState('Origem');
    const [texto, onText] = React.useState('Destino');
    const navigation = useNavigation();

    return (
    <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={30}
        style={styles.containerScroll}
    >     
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

