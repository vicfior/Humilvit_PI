import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import styles from "./styles";

import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from 'expo-location';

const ORS_API_KEY = '5b3ce3597851110001cf624843e18197109e4a16a1c5a5ca281e4cca';

// --- Função auxiliar para parsear coordenadas (já existente e ok) ---
const parseCoords = (input) => {
  if (typeof input === 'string') {
    const parts = input.split(',').map(s => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { latitude: parts[0], longitude: parts[1] };
    }
    return null;
  }
  if (input && typeof input.latitude === 'number' && typeof input.longitude === 'number') {
    return input;
  }
  return null;
};

const Mapa = () => {
  const route = useRoute();
  // Renomeando para evitar conflito com os estados locais
  const {
    origin: initialOriginParam,
    destination: initialDestinationParam,
    waypoints: initialWaypointsParam = [], // Novo: para receber waypoints
    useCurrentLocation
  } = route.params || {};

  const [origin, setOrigin] = useState(() => parseCoords(initialOriginParam));
  const [destination, setDestination] = useState(() => parseCoords(initialDestinationParam));
  const [waypoints, setWaypoints] = useState(() => initialWaypointsParam.map(parseCoords).filter(Boolean)); // Novo: estado para waypoints
  const [routeCoords, setRouteCoords] = useState([]);
  const [isOriginDragged, setIsOriginDragged] = useState(false);
  const mapRef = useRef(null);

  // Lógica para obter a localização inicial do usuário ou usar a passada via props
  useEffect(() => {
    async function loadLocation() {
      if (useCurrentLocation !== false && !isOriginDragged && !origin) {
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

        if (!destination && !initialDestinationParam) { // Verifica também se não veio via parâmetro
          const destCoords = {
            latitude: coords.latitude + 0.001,
            longitude: coords.longitude + 0.001,
          };
          console.log("Destino inicial (padrão):", destCoords);
          setDestination(destCoords);
        }

      } else {
        console.log("Origem inicial (via pesquisa ou existente):", origin);
        console.log("Destino inicial (via pesquisa ou existente):", destination);
        console.log("Waypoints iniciais:", waypoints); // Log dos waypoints
      }
    }

    loadLocation();
  }, [initialOriginParam, initialDestinationParam, initialWaypointsParam, useCurrentLocation, isOriginDragged, origin, destination]);

  // Atualiza localização da origem em tempo real SOMENTE se a origem for a localização do usuário
  // e se não foi arrastada manualmente.
  useEffect(() => {
    let subscription;

    async function watchLocation() {
        if (useCurrentLocation !== false && !isOriginDragged) {
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
                    console.log("Origem (atualizada por GPS):", newCoords);
                    setOrigin(newCoords);
                }
            );
        }
    }

    watchLocation();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [useCurrentLocation, isOriginDragged]);

  // Atualiza rota quando origem, destino ou waypoints mudam
  useEffect(() => {
    if (origin && destination) {
      fetchRoute(origin, destination, waypoints); // Passa waypoints
    }
  }, [origin, destination, waypoints]); // Adiciona waypoints como dependência

  // Ajusta o zoom do mapa quando a rota ou os pontos mudam
  useEffect(() => {
    if (mapRef.current && origin && destination) {
        const coordsToFit = [origin, destination, ...waypoints]; // Inclui waypoints no ajuste
        if (routeCoords.length > 0) {
          coordsToFit.push(...routeCoords);
        }
        mapRef.current.fitToCoordinates(coordsToFit, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
    }
  }, [origin, destination, waypoints, routeCoords]); // Adiciona waypoints como dependência

  // --- Função fetchRoute modificada para aceitar waypoints ---
  const fetchRoute = async (start, end, intermediateWaypoints = []) => {
    try {
      const allCoordinates = [
        [start.longitude, start.latitude],
        ...intermediateWaypoints.map(wp => [wp.longitude, wp.latitude]), // Mapeia waypoints
        [end.longitude, end.latitude],
      ];

      const response = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          method: 'POST',
          headers: {
            'Authorization': ORS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: allCoordinates, // Envia todas as coordenadas
            // Você pode adicionar mais opções aqui se precisar, como "continue_straight"
            // options: {
            //   waypoints: {
            //     continue_straight: [false, false] // Exemplo: não forçar linha reta nos waypoints
            //   }
            // }
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
        console.warn("Rota não encontrada ou resposta inesperada:", data);
        Alert.alert("Rota não encontrada para os pontos fornecidos.");
        setRouteCoords([]);
      }

    } catch (error) {
      console.error("Erro ao buscar rota:", error);
      Alert.alert("Erro ao buscar rota. Verifique sua conexão e chave de API.");
      setRouteCoords([]);
    }
  };

  const handleOriginDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newOrigin = { latitude, longitude };
    console.log("Origem movida:", newOrigin);
    setOrigin(newOrigin);
    setIsOriginDragged(true);
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

            {/* Marcador de Origem */}
            <Marker
              coordinate={origin}
              title="Sua Origem"
              draggable
              onDragEnd={handleOriginDrag}
              pinColor="red" // Mudei para vermelho para mais contraste com o cinza anterior
            />

            {/* Marcadores de Waypoints (Paradas de Ônibus) */}
            {waypoints.map((wp, index) => (
              <Marker
                key={`waypoint-${index}`} // Chave única é importante
                coordinate={wp}
                title={`Parada ${index + 1}`}
                pinColor="orange" // Cor diferente para as paradas
              />
            ))}

            {/* Marcador de Destino */}
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