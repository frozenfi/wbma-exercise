import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {baseUrl, uploadUrl} from '../utils/variables';

//built in prop route
const Single = ({route}) => {
  const {title, description, filename, time_added} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      <Image style={styles.image} source={{uri: uploadUrl + filename}} />
      <Text>{description}</Text>
      <Text>{time_added}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 200,
    height: 300,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};
export default Single;
