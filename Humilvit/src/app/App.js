import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './router';
import { useFonts, Roboto_400Regular, Roboto_600SemiBold, Roboto_700Bold  } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';


export default function App() {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_600SemiBold,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading/>;
  } 

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" translucent={true} />
      <Routes/>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
