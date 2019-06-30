//This is an example code for Navigator//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Button, Platform, Text, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { IconButton, Colors } from 'react-native-paper';

export default class FirstPage extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  static navigationOptions = {
    title: 'Context Aware App',
    //Sets Header text of Status Bar
    headerStyle: {
      backgroundColor: '#f4511e',
      //Sets Header color
    },
    headerTintColor: '#fff',
    //Sets Header text color
    headerTitleStyle: {
      fontWeight: 'bold',
      //Sets Header text style
    },
  };

  render() {
    const { navigate } = this.props.navigation;
    let latitude = 'Latitude...';
    let longitude = 'Longitude...'
    if (this.state.errorMessage) {
      latitude = this.state.errorMessage;
      longitude = this.state.errorMessage;
    } else if (this.state.location) {
      latitude = JSON.stringify(this.state.location.coords.latitude);
      longitude = JSON.stringify(this.state.location.coords.longitude);
    }

    return (

      <View style={styles.container}>
      <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5} onPress={() =>navigate('SecondPage', {"location":this.state.location})}>
            {/*We can use any component which is used to shows something inside TouchableOpacity.
          It shows the item inside in horizontal orientation */}
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/slr-camera-icon-18-256.png',
              }}
              //You can also show the image from you project directory like below
              //source={require('./Images/facebook.png')}

              //Image Style
              style={styles.ImageIconStyle}
            />
      <View style={styles.SeparatorLine} />
      <Text style={styles.TextStyle}> Image Recognition </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5} onPress={() =>navigate('ThirdPage', {"location":this.state.location})}>
            {/*We can use any component which is used to shows something inside TouchableOpacity.
          It shows the item inside in horizontal orientation */}
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://oneyoueastsussex.org.uk/wp-content/uploads/2018/01/Location-pin.png',
              }}
              //You can also show the image from you project directory like below
              //source={require('./Images/facebook.png')}

              //Image Style
              style={styles.ImageIconStyle}
            />
      <View style={styles.SeparatorLine} />
      <Text style={styles.TextStyle}> Radial Geo-fence </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5} onPress={() =>navigate('BeaconPage', {"location":this.state.location})}>
            {/*We can use any component which is used to shows something inside TouchableOpacity.
          It shows the item inside in horizontal orientation */}
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://flaticons.net/gd/makefg.php?i=icons/Application/Group-Cluster.png&r=255&g=255&b=255',
              }}
              //You can also show the image from you project directory like below
              //source={require('./Images/facebook.png')}

              //Image Style
              style={styles.ImageIconStyle}
            />
      <View style={styles.SeparatorLine} />
      <Text style={styles.TextStyle}> Markers Clustering </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5} onPress={() =>navigate('HeatMap')}>
            {/*We can use any component which is used to shows something inside TouchableOpacity.
          It shows the item inside in horizontal orientation */}
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'http://gesturecons.com/gestures/1-tap-gesture-icon.png',
              }}
              //You can also show the image from you project directory like below
              //source={require('./Images/facebook.png')}

              //Image Style
              style={styles.ImageIconStyle}
            />
      <View style={styles.SeparatorLine} />
      <Text style={styles.TextStyle}> Free Drawing Geo-Fence </Text>
      </TouchableOpacity>
        <Text style={styles.paragraph}>Latitude: {latitude}</Text>
        <Text style={styles.paragraph}>Longitude: {longitude}</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },

  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },

  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },

  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});
