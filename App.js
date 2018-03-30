/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import {APPID} from 'react-native-dotenv';
import axios from 'axios'

const id = 7839791

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: true
    }
  }

  componentDidMount = () => {
    this.getData();
  }

  getData = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${APPID}&units=metric`)
      .then(result => {
        console.log('result', result.data)
        this.setState({ fetching: false, data: result.data });
      }).catch(error => {
        console.log('error', error)
        this.setState({ fetching: false })
      })
  }

  render = () => {
    const { data, fetching } = this.state
    if (fetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 5 }}>LOADING</Text>
        </View>
      )
    }
    if (data) {
      let backgroundUri = 'https://www.azernews.az/media/2017/01/23/clouds_3.jpg';
      // An if statement can be put here to change background image depending on temp etc
      // if (data.main.temp > 25) {
      //   backgroundUri = 'insert hot weather image url here'
      // }
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: backgroundUri }}
            style={[
              StyleSheet.absolutefill,
              {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                resizeMode: 'cover'
              }
            ]}
          />
          <View style={[styles.container, StyleSheet.absoluteFill]}>
            <Text style={styles.welcome}>
              {data.name}
            </Text>
            <Text style={styles.instructions}>
              {data.main.temp}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Oh oh :( Data not loaded
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
