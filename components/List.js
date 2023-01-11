import {FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import ListItem from './ListItem';
import {baseUrl, uploadUrl} from '../utils/variables';
import {array} from 'prop-types';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();

      // 2nd fetch:
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          const allMedia = await fileResponse.json();
          console.log('All media..', allMedia);
          return allMedia;
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.log('List loadmedia error file: ', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      style={{padding: 10}}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <>
            <ListItem singleMedia={item} />
          </>
        );
      }}
    />
  );
};

export default List;
