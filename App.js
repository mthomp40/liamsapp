/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import axios from 'axios';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires main queue setup'
]);

const id = 7839791;
const APPID = 'insert API key here';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
    StatusBar.setBarStyle('light-content');
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${APPID}&units=metric`
      )
      .then(result => {
        console.log('result', result.data);
        this.setState({ fetching: false, data: result.data });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({ fetching: false });
      });
  };

  getTimeString = dateString => {
    const date = new Date(dateString);
    const isAM = date.getHours() < 12;
    return `${date.getHours()}:${date.getMinutes()} ${isAM ? 'AM' : 'PM'}`;
  };

  render = () => {
    const { data, fetching } = this.state;
    const dateNow = new Date();
    if (fetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 5 }}>LOADING</Text>
        </View>
      );
    }
    if (data) {
      let backgroundUri =
        'https://www.azernews.az/media/2017/01/23/clouds_3.jpg';
      // An if statement can be put here to change background image depending on temp etc
      // if (data.main.temp > 25) {
      //   backgroundUri = 'insert hot weather image url here'
      // }
      const iconUrls = {
        clear_sky: '01d.png',
        few_clouds: '02d.png',
        scattered_clouds: '03d.png',
        broken_clouds: '04d.png'
      };
      const description = data.weather[0].description;
      const underscoreDescription =
        description && description.replace(' ', '_');
      const iconUrl = underscoreDescription && iconUrls[underscoreDescription];
      const weatherIconSource = `http://openweathermap.org/img/w/${iconUrl}`;
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
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
            <View style={styles.header}>
              <Text style={styles.city}>{data.name}</Text>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowText}>Now</Text>
                <Text style={styles.rowText}>
                  UPDATED AT {this.getTimeString(dateNow)}
                </Text>
              </View>
              <View style={styles.rowLeft}>
                <Text style={[styles.rowText, { alignSelf: 'flex-end' }]}>
                  Today
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Text style={styles.temp}>{data.main.temp}&deg;C</Text>
              </View>
              <View style={[styles.rowLeft, { flexDirection: 'column' }]}>
                <Image
                  source={{ uri: weatherIconSource }}
                  style={styles.weatherIcon}
                />
                <Text style={[styles.rowText, { alignSelf: 'flex-end' }]}>
                  {description.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.city}>Oh oh :( Data not loaded</Text>
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  lowerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'black'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingTop: 15,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  city: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    margin: 10
  },
  row: {
    flexDirection: 'row'
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    margin: 15
  },
  rowText: {
    fontSize: 12,
    alignSelf: 'flex-start',
    color: 'gray'
  },
  temp: {
    fontSize: 24,
    alignSelf: 'flex-start',
    color: 'white',
    margin: 15
  },
  weatherIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginRight: 15
  }
});
