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

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity style={styles.mediaContainer}>
      <View style={styles.imgBlock}>
        <Image
          style={styles.image}
          source={{uri: item.thumbnails.w160}}
          imageStyle={{resizeMode: 'contain'}}
        />
      </View>
      <ScrollView style={styles.textBlock}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;

const styles = StyleSheet.create({
  mediaContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 6,
    marginBottom: 5,
    height: 110,
    backgroundColor: '#181922',
  },
  imgBlock: {
    flex: 1,
    padding: 5,
    alignSelf: 'center',
  },
  image: {
    height: 60,
    width: '90%',
    flex: 2,
    borderRadius: 6,
    borderBottomLeftRadius: 40,
  },
  textBlock: {
    flex: 4,
    padding: 1,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 5,
    color: 'white',
    marginBottom: 2,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    bottom: 5,
  },
});
