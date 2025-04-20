import React from "react";
import { View, Text, Touchable, TouchableOpacity, TextInput } from "react-native";
import styles from "../../../components/styles";
import Icon from 'react-native-vector-icons/Ionicons';

export default function TripPlan() {

    const [text, onChangeText] = React.useState('Origem');
    const [texto, onText] = React.useState('Destino');

    return (
        <View>
            <TouchableOpacity style={styles.inputContainer}>
                <Icon name="search" size={20} color="#999" style={styles.iconInput}/>
                <TextInput 
                style={styles.input}
                onChangeText={onChangeText}
                value = {text}
                />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.inputContainer}>
            <Icon name="search" size={20} color="#999" style={styles.iconInput}/>
                <TextInput 
                style={styles.input}
                onChangeText={onText}
                value = {texto}
                />
            </TouchableOpacity>
            <View style={styles.tripContainer}>
                <Text style={styles.textContainer}>Estação mais próxima</Text>
                <View style={styles.line}/>
                <Text style={styles.textContainer1}>Nome da estação</Text>
                <Text style={styles.text}>140m - 3 min a pé</Text>
                <View style={styles.lineShort}/>
                <View style={styles.textInfo}>
                    <Text style={styles.title}>Num Onibus</Text>
                    <Text style={styles.text}>Destino</Text>
                    <Text style={styles.text}>Tempo</Text>
                </View>
                <View style={styles.lineShort1}/>
                <View style={styles.textInfo}>
                    <Text style={styles.title}>Num Onibus</Text>
                    <Text style={styles.text}>Destino</Text>
                    <Text style={styles.text}>Tempo</Text>
                </View>
                <View style={styles.lineShort1}/>
                <View style={styles.textInfo}>
                    <Text style={styles.title}>Num Onibus</Text>
                    <Text style={styles.text}>Destino</Text>
                    <Text style={styles.text}>Tempo</Text>
                </View>
                <View style={styles.lineShort1}/>
            </View>
            <View style={styles.bottomTripContainer}>
                <Text style={styles.textContainer}>Acessos Recentes</Text>  
                <Text style={styles.textContainer1}>Local</Text>
                <Text style={styles.text}>Endereço</Text>
                <View style={styles.line2}/>
                <Text style={styles.textContainer1}>Local</Text>
                <Text style={styles.text}>Endereço</Text> 
                <View style={styles.line2}/> 
            </View>
        </View>
    );
}

