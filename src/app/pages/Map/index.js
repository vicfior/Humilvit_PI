import React, { useEffect, useState, useRef } from "react";
import { View, Alert, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from 'expo-location';

const ORS_API_KEY = '5b3ce3597851110001cf62482cc70d85d11c4e1a9db8461b1a68d6b3';

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

const Mapa = (props) => {
  const route = useRoute();
  const {
    origin: initialOriginParam,
    destination: initialDestinationParam,
    waypoints: initialWaypointsParam = [],
    useCurrentLocation
  } = route.params || {};

  const [origin, setOrigin] = useState(() => parseCoords(props.origin ?? initialOriginParam));
  const [destination, setDestination] = useState(() => parseCoords(props.destination ?? initialDestinationParam));
  const [waypoints, setWaypoints] = useState(() => (props.waypoints ?? initialWaypointsParam).map(parseCoords).filter(Boolean));
  const [routeCoords, setRouteCoords] = useState([]);
  const [isOriginDragged, setIsOriginDragged] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(() => parseCoords(props.origin ?? initialOriginParam));
  const mapRef = useRef(null);

  const formatCoordinates = (coords) => {
    if (!coords) return "N/A";
    return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
  };

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
        setOrigin(coords);
        setCurrentCoords(coords);
        if (!destination && !initialDestinationParam) {
          const destCoords = {
            latitude: coords.latitude + 0.001,
            longitude: coords.longitude + 0.001,
          };
          setDestination(destCoords);
        }
      }
    }
    loadLocation();
  }, [initialOriginParam, initialDestinationParam, initialWaypointsParam, useCurrentLocation, isOriginDragged, origin, destination]);

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
            setOrigin(newCoords);
            setCurrentCoords(newCoords);
          }
        );
      }
    }
    watchLocation();
    return () => {
      if (subscription) subscription.remove();
    };
  }, [useCurrentLocation, isOriginDragged]);

  useEffect(() => {
    if (origin && destination) {
      fetchRoute(origin, destination, waypoints);
      setCurrentCoords(origin);
    }
  }, [origin, destination, waypoints]);

  useEffect(() => {
    if (mapRef.current && origin && destination) {
      const coordsToFit = [origin, destination, ...waypoints];
      if (routeCoords.length > 0) {
        coordsToFit.push(...routeCoords);
      }
      mapRef.current.fitToCoordinates(coordsToFit, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [origin, destination, waypoints, routeCoords]);

  useEffect(() => {
    if (props.onOriginChange && origin) {
      props.onOriginChange(origin);
    }
  }, [origin]);

  const fetchRoute = async (start, end, intermediateWaypoints = []) => {
    try {
      const allCoordinates = [
        [start.longitude, start.latitude],
        ...intermediateWaypoints.map(wp => [wp.longitude, wp.latitude]),
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
            coordinates: allCoordinates,
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
      setRouteCoords([]);
    }
  };

  const handleOriginDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newOrigin = { latitude, longitude };
    setOrigin(newOrigin);
    setCurrentCoords(newOrigin);
    setIsOriginDragged(true);
    if (props.onOriginChange) {
      props.onOriginChange(newOrigin);
    }
  };

  const handleDestinationDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const newDest = { latitude, longitude };
    setDestination(newDest);
  };

  return (
    <View style={styles.container}>
      {currentCoords && (
        <View style={styles.coordsDisplay}>
          <Text style={styles.coordsText}>
            Coordenadas: {formatCoordinates(currentCoords)}
          </Text>
        </View>
      )}
      {origin && destination && (
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
            title="Sua Origem"
            draggable
            onDragEnd={handleOriginDrag}
            pinColor="red"
          />
          {waypoints.map((wp, index) => (
            <Marker
              key={`waypoint-${index}`}
              coordinate={wp}
              title={`Parada ${index + 1}`}
              pinColor="orange"
            />
          ))}
          <Marker
            coordinate={destination}
            title="Destino"
            draggable
            onDragEnd={handleDestinationDrag}
            pinColor="#0888D8"
          />
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor="#0835D8"
              strokeWidth={4}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

export default Mapa;