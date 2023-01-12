import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';

const ListItem = ({navigation, singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Single', item)}
      style={styles.mediaContainer}
    >
      <View style={{flex: 1}}>
        <Image
          style={styles.imgBlock}
          source={{uri: uploadUrl + item.thumbnails?.w160}}
          imageStyle={{resizeMode: 'cover'}}
        />
      </View>
      <ScrollView style={styles.textBlock}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text>{item.description}</Text>
      </ScrollView>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

export default ListItem;

const styles = StyleSheet.create({
  mediaContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    marginBottom: 5,
    height: 215,
    backgroundColor: 'lightgray',
  },
  imgBlock: {
    flex: 3,
    borderRadius: 8,
  },
  textBlock: {flex: 1, paddingLeft: 15},

  titleText: {fontSize: 16, fontWeight: 'bold'},
});
