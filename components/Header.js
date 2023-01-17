import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';

const Header = () => {
  return (
    <View>
      <ImageBackground
        style={styles.imageBackgorund}
        source={require('../assets/kittens.jpg')}
        imageStyle={{borderBottomRightRadius: 60}}
      />
      <Text style={styles.textHeading}> Welcome to Kitten World</Text>
      <Ionicons style={styles.menuBar} name={'menu'} size={30} />
      <Ionicons
        style={styles.settingsBar}
        name={'md-settings-outline'}
        size={30}
      />
      <Text style={styles.textTitle}>Kittens For Adoption</Text>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  imageBackgorund: {margin: 5, width: '100%', height: 300},
  textTitle: {
    margin: 8,
    backgroundColor: 'blue',
    padding: 10,
    color: 'white',
    fontSize: 18,
    bottom: 25,
    position: 'absolute',
  },
  textHeading: {
    position: 'absolute',
    top: 10,
    left: 60,
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuBar: {position: 'absolute', top: 30, left: 20},
  settingsBar: {position: 'absolute', top: 30, right: 20},
});
