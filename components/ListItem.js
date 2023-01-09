import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity>
      <Image
        style={{width: 100, height: 100}}
        source={{uri: item.thumbnails.w160}}
      />
      <View>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};


export default ListItem;
