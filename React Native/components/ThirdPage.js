//This is an example code for Navigator//
import React, { Component } from 'react';
//import react in our code.
import { Dimensions, StyleSheet, View, Text } from 'react-native';
//import all the components we are going to use.
import MapView, { Circle } from "react-native-maps";
import { SearchBar } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class ThirdPage extends Component {
  state = {
    markers: [],
    value: 22000,
    location: null
  }

  componentWillMount() {
    this.fetchMarkers();
  }

  fetchMarkers = async () => {
    const {state} = this.props.navigation;
    fetch('http://192.168.43.24:3600/discovered/' +
    this.state.value +
    '/' +
    state.params.location.coords.longitude +
    '/' +
    state.params.location.coords.latitude +
    '/')
    .then(response => response.json())
    .then(data => {
      this.setState({ markers: data });
    })
    .catch(error => console.error(error))
  };

  updateSearch(newValue) {
    this.setState({ markers: [] })
    this.setState({ value: newValue })
    this.fetchMarkers()
  };

  static navigationOptions = {
    title: 'Radial Geofence Search',
    //Sets Header text of Status Bar
  };
  render() {
    const { navigate } = this.props.navigation;
    const { search } = this.state;
    return (
      <View
        style={{flex: 1}}
      >
      <NumericInput
        value={this.state.value}
        onChange={value => this.updateSearch(value)}
        minValue = { 1000 }
        max = { 100000 }
        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
        totalWidth={240}
        totalHeight={50}
        iconSize={25}
        step={1000}
        valueType='real'
        rounded
        textColor='#2F4F4F'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#2F4F4F'
        leftButtonBackgroundColor='#20B2AA'/>
        <MapView
          style = {styles.map}
          region = {{
            latitude: 44.5075,
            longitude: 11.3514,
            latitudeDelta: 0.600,
            longitudeDelta: 0.600
          }}
           showsUserLocation={true}
        >
        <Circle
            key = { (10000 + 20000).toString() }
            center = {{
              latitude: 44.5075,
              longitude: 11.3514
            }}
            radius = { this.state.value }
            strokeWidth = { 1 }
            strokeColor = { '#1a66ff' }
            fillColor = { 'rgba(230,238,255,0.5)' }
        />
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={ Math.random() + 1 }
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width,
    height
  }
})
