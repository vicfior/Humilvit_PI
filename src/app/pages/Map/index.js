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

// --- Função auxiliar para parsear coordenadas ---
const parseCoords = (input) => {
  if (typeof input === 'string') {
    const parts = input.split(',').map(s => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { latitude: parts[0], longitude: parts[1] };
    }
    return null; // Retorna null se a string não for um formato válido de coordenada
  }
  // Se já for um objeto com latitude e longitude, ou se for null/undefined, retorna como está
  if (input && typeof input.latitude === 'number' && typeof input.longitude === 'number') {
    return input;
  }
  return null;
};

const Mapa = () => {
  const route = useRoute();
  // Parseia os parâmetros de rota imediatamente
  const {
    origin: initialOriginParam,
    destination: initialDestinationParam,
    useCurrentLocation
  } = route.params || {};

  // Inicializa os estados com as coordenadas parseadas
  const [origin, setOrigin] = useState(() => parseCoords(initialOriginParam));
  const [destination, setDestination] = useState(() => parseCoords(initialDestinationParam));
  const [routeCoords, setRouteCoords] = useState([]);
  const [isOriginDragged, setIsOriginDragged] = useState(false); // Adicionado para controle de arrasto
  const mapRef = useRef(null);

  // Lógica para obter a localização inicial do usuário ou usar a passada via props
  useEffect(() => {
    async function loadLocation() {
      // Só obtém a localização atual se useCurrentLocation não for false E a origem não foi arrastada
      // E a origem não foi fornecida via parâmetros de rota (ou não foi um formato válido)
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

        // Se nenhum destino foi passado via props ou não foi válido, defina um destino padrão próximo
        if (!destination) {
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
      }
    }

    loadLocation();
  }, [initialOriginParam, initialDestinationParam, useCurrentLocation, isOriginDragged, origin, destination]); // Adicione as dependências relevantes

  // Atualiza localização da origem em tempo real SOMENTE se a origem for a localização do usuário
  // e se não foi arrastada manualmente.
  useEffect(() => {
    let subscription;

    async function watchLocation() {
        // Apenas monitora se a origem é a localização atual E SE AINDA NÃO FOI ARRASTADA
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

  // Atualiza rota quando origem ou destino mudam
  useEffect(() => {
    if (origin && destination) {
      fetchRoute(origin, destination);
    }
  }, [origin, destination]);

  // Ajusta o zoom do mapa quando a rota ou os pontos mudam
  useEffect(() => {
    if (mapRef.current && origin && destination) {
        const coordsToFit = [origin, destination];
        if (routeCoords.length > 0) {
          coordsToFit.push(...routeCoords);
        }
        mapRef.current.fitToCoordinates(coordsToFit, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
    }
  }, [origin, destination, routeCoords]);

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
        setRouteCoords([]);
      }

    } catch (error) {
      console.error("Erro ao buscar rota:", error);
      Alert.alert("Erro ao buscar rota.");
      setRouteCoords([]);
    }
  };

  const handleOriginDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newOrigin = { latitude, longitude };
    console.log("Origem movida:", newOrigin);
    setOrigin(newOrigin);
    setIsOriginDragged(true); // Marca que a origem foi arrastada manualmente
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
              draggable // Permite arrastar
              onDragEnd={handleOriginDrag} // Lida com o fim do arrasto
              pinColor="gray"
            />

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