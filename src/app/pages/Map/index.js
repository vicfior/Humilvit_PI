/*import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Alert,
} from "react-native";

import styles from "./styles";

import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from 'expo-location';

const ORS_API_KEY = '5b3ce3597851110001cf624843e18197109e4a16a1c5a5ca281e4cca'; // Substitua por sua chave da OpenRouteService

const Mapa = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef(null);

  // Obter localização inicial e destino
  useEffect(() => {
    async function loadLocation() {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert('Permissão negada para acessar localização.');
        return;
      }

      const currentPosition = await getCurrentPositionAsync();
      const coords = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };

      console.log("Origem inicial:", coords);
      setOrigin(coords);

      const destCoords = {
        latitude: coords.latitude + 0.001,
        longitude: coords.longitude + 0.001,
      };

      console.log("Destino inicial:", destCoords);
      setDestination(destCoords);
    }

    loadLocation();
  }, []);

  // Atualiza localização da origem em tempo real
  useEffect(() => {
    let subscription;

    async function watchLocation() {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert("Permissão negada para acessar localização.");
        return;
      }

      subscription = await watchPositionAsync(
        {
          accuracy: LocationAccuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          const newCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          console.log("Origem (atualizada):", newCoords);
          setOrigin(newCoords);
        }
      );
    }

    watchLocation();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // Atualiza rota quando origem ou destino mudam
  useEffect(() => {
    if (origin && destination) {
      fetchRoute(origin, destination);
    }
  }, [origin, destination]);

  const fetchRoute = async (start, end) => {
    try {
      const response = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          method: 'POST',
          headers: {
            'Authorization': ORS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [
              [start.longitude, start.latitude],
              [end.longitude, end.latitude],
            ],
          }),
        }
      );

      const data = await response.json();

      if (data?.features?.length) {
        const coords = data.features[0].geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoords(coords);
      } else {
        Alert.alert("Rota não encontrada.");
      }

    } catch (error) {
      console.error("Erro ao buscar rota:", error);
      Alert.alert("Erro ao buscar rota.");
    }
  };

  const handleDestinationDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newDest = { latitude, longitude };
    console.log("Destino movido:", newDest);
    setDestination(newDest);
  };

  return (
    <View style={styles.container}>
      {
        origin && destination && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              ...origin,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <UrlTile
              urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />

            <Marker
              coordinate={origin}
              title="Você está aqui"
              pinColor="gray"
            />
        */
            {/* Destino (verde) 
            <Marker
              coordinate={destination}
              title="Destino"
              draggable
              onDragEnd={handleDestinationDrag}
              pinColor="#0888D8"
            />

            {/* Linha da rota */}
           /* {
              routeCoords.length > 0 && (
                <Polyline
                  coordinates={routeCoords}
                  strokeColor="#0835D8"
                  strokeWidth={4}
                />
              )
            }
          </MapView>
        )
      }
    </View>*/
  //);
//}; 

//export default Mapa;  


import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native"; // Importe useRoute para acessar os parâmetros

import styles from "./styles"; // Verifique se o caminho está correto

import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from 'expo-location';

const ORS_API_KEY = '5b3ce3597851110001cf624843e18197109e4a16a1c5a5ca281e4cca'; // Substitua por sua chave da OpenRouteService

const Mapa = () => {
  const route = useRoute(); // Hook para acessar os parâmetros de rota
  const { origin: initialOrigin, destination: initialDestination, useCurrentLocation } = route.params || {};

  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef(null);

  // Lógica para obter a localização inicial do usuário ou usar a passada via props
  useEffect(() => {
    async function loadLocation() {
      if (useCurrentLocation !== false) { // Se não for especificado ou for true, usa a localização atual
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          Alert.alert('Permissão negada para acessar localização.');
          return;
        }

        const currentPosition = await getCurrentPositionAsync();
        const coords = {
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        };

        console.log("Origem inicial (localização atual):", coords);
        setOrigin(coords);

        // Se nenhum destino foi passado via props, defina um destino padrão próximo
        if (!initialDestination) {
          const destCoords = {
            latitude: coords.latitude + 0.001,
            longitude: coords.longitude + 0.001,
          };
          console.log("Destino inicial (padrão):", destCoords);
          setDestination(destCoords);
        }

      } else { // Se useCurrentLocation for false, significa que a origem veio da pesquisa
        console.log("Origem inicial (via pesquisa):", initialOrigin);
        console.log("Destino inicial (via pesquisa):", initialDestination);
        // Os estados já foram inicializados com initialOrigin e initialDestination
      }
    }

    loadLocation();
  }, [initialOrigin, initialDestination, useCurrentLocation]); // Adicione as dependências

  // Atualiza localização da origem em tempo real SOMENTE se a origem for a localização do usuário
  useEffect(() => {
    let subscription;

    async function watchLocation() {
        if (useCurrentLocation !== false) { // Apenas monitora se a origem é a localização atual
            const { granted } = await requestForegroundPermissionsAsync();
            if (!granted) {
                Alert.alert("Permissão negada para acessar localização.");
                return;
            }

            subscription = await watchPositionAsync(
                {
                    accuracy: LocationAccuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (location) => {
                    const newCoords = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    console.log("Origem (atualizada):", newCoords);
                    setOrigin(newCoords);
                }
            );
        }
    }

    watchLocation();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [useCurrentLocation]); // Depende de useCurrentLocation

  // Atualiza rota quando origem ou destino mudam
  useEffect(() => {
    if (origin && destination) {
      fetchRoute(origin, destination);
      // Ajusta o zoom do mapa para incluir a rota
      if (mapRef.current) {
        const coordsToFit = [origin, destination];
        if (routeCoords.length > 0) {
          coordsToFit.push(...routeCoords); // Inclui todos os pontos da rota
        }
        mapRef.current.fitToCoordinates(coordsToFit, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    }
  }, [origin, destination, routeCoords]); // Adicione routeCoords como dependência

  const fetchRoute = async (start, end) => {
    try {
      const response = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          method: 'POST',
          headers: {
            'Authorization': ORS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [
              [start.longitude, start.latitude],
              [end.longitude, end.latitude],
            ],
          }),
        }
      );

      const data = await response.json();

      if (data?.features?.length) {
        const coords = data.features[0].geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoords(coords);
      } else {
        //Alert.alert("Rota não encontrada.");
        setRouteCoords([]); // Limpa a rota se não for encontrada
      }

    } catch (error) {
      console.error("Erro ao buscar rota:", error);
      Alert.alert("Erro ao buscar rota.");
      setRouteCoords([]); // Limpa a rota em caso de erro
    }
  };

  const handleDestinationDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newDest = { latitude, longitude };
    console.log("Destino movido:", newDest);
    setDestination(newDest);
  };

  return (
    <View style={styles.container}>
      {
        origin && destination && (
          <MapView
            ref={mapRef}
            style={styles.map}
            // initialRegion é opcional aqui, fitToCoordinates será chamado no useEffect
            initialRegion={{
                ...origin,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
          >
            <UrlTile
              urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />

            <Marker
              coordinate={origin}
              title="Você está aqui"
              pinColor="gray"
            />

            {/* Destino (verde) */}
            <Marker
              coordinate={destination}
              title="Destino"
              draggable
              onDragEnd={handleDestinationDrag}
              pinColor="#0888D8"
            />

            {/* Linha da rota */}
            {
              routeCoords.length > 0 && (
                <Polyline
                  coordinates={routeCoords}
                  strokeColor="#0835D8"
                  strokeWidth={4}
                />
              )
            }
          </MapView>
        )
      }
    </View>
  );
};

export default Mapa;


