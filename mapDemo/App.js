import { StyleSheet, View } from "react-native";
import MapView, { Marker, marker } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from 'expo-location';

//skriv npx expo install react-native-maps
// brug MapView - og du har maps på.

// set Map Region:
// brug useState.

// brug marker
// brug useState

export default function App() {
  const [markers, setMarkers] = useState([]);

  const [region, setRegion] = useState({
    latitude: 55, // hvad på kortet skal vises
    longitude: 12, // hvad på kortet skal vises
    latitudeDelta: 20, // Hvor zoomede ind ud skal vi være?
    longitudeDelta: 20, // Hvor zoomede ind ud skal vi være?
  });

  // denne har en variabel, som "ikke forsvinder" 
  // skaber ikke en ny rendering, som useState gør.
  const mapView = useRef(null); // ref til mmapView objekt.
  const locationSubscribtion = useRef(null) // når vi lukker appen, så lytter vi ikke mere.

  useEffect(() => {
    async function startListening() {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted') {
        alert("Ingen adgang til lokationen")
        return
      }
      locationSubscribtion.current = await Location.watchPositionAsync({
        distanceInterval: 100,
        accuracy: Location.Accuracy.High
      }, (location) => {
        const newRegion = {
          latitude: location.coords.latitude, 
          longitude: location.coords.longitude, 
          latitudeDelta: 20, 
          longitudeDelta: 20,

        }
        setRegion(newRegion) //flytter kortet til den nye lokation
        if (mapView.current) {
          mapView.current.animateToRegion(newRegion)
        }
    })
    }
    startListening()
    return () => {
      if (locationSubscribtion.current) {
        locationSubscribtion.current.remove()
      }
    }
  }, []) // med tom array, betyder det at den kun skal køre en enkel gang. 

  function addMarker(data) {
    const { latitude, longitude } = data.nativeEvent.coordinate;
    const newMarker = {
      coordinate: { latitude, longitude },
      key: data.timeStamp,
      title: "Great place",
    };
    setMarkers([...markers, newMarker]);
  }


  // funktion, der viser noget når man trykker på ens pin. 

  function onMarkerPress(text) {
    alert("You pressed " + text)
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onLongPress={addMarker}>
        {markers.map((marker) => (
          <Marker
            coordinate={marker.coordinate}
            key={marker.key}
            title={marker.title}
            onPress={() => onMarkerPress(marker.title)}
          />
        ))}
      </MapView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
