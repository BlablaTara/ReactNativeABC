import { StyleSheet, View } from "react-native";
import MapView, { Marker, marker } from "react-native-maps";
import { useState } from "react";

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
