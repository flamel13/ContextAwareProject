import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from "expo";
import ClusterMarker from "./ClusterMarker";
import { getCluster } from "./utils/MapUtils";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFill
  }
});

const INITIAL_POSITION = {
  latitude: 44.5075,
  longitude: 11.3514,
  latitudeDelta: 0.600,
  longitudeDelta: 0.600
}

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Clustering',
    //Sets Header text of Status Bar
  };

  state = {
    region: INITIAL_POSITION,
    coords: []
  };

  componentWillMount() {
    this.fetchMarkers();
  }

  fetchMarkers = async () => {
    const {state} = this.props.navigation;
    fetch('http://192.168.43.24:3600/discoveredcluster/20000000/'+
    state.params.location.coords.longitude +
    '/' +
    state.params.location.coords.latitude +
    '/')
    .then(response => response.json())
    .then(data => {
      this.setState({ coords: data });
      console.log(this.state.coords)
    })
    .catch(error => console.error(error))
  };

  renderMarker = (marker, index) => {
    const key = index + marker.geometry.coordinates[0];

    // If a cluster
    if (marker.properties) {
      return (
        <MapView.Marker
          key={key}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
        >
          <ClusterMarker count={marker.properties.point_count} />
        </MapView.Marker>
      );
    }
    // If a single marker
    return (
      <MapView.Marker
        key={key}
        title="prova"
        description="prova"
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
      />
    );
  };

  render() {
    const { region } = this.state;

    const { coords } = this.state;

    console.log(coords)

    const allCoords = coords.map(c => ({
      geometry: {
        coordinates: [c.lon, c.lat]
      }
    }));

    const cluster = getCluster(allCoords, region);

    return (
      <View style={Style.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={Style.map}
          loadingIndicatorColor={"#ffbbbb"}
          loadingBackgroundColor={"#ffbbbb"}
          region={region}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
        </MapView>
      </View>
    );
  }
}
