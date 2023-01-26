import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      style={{padding: 10}}
      data={mediaArray}
      keyExtractor={(item, index) => 'key' + index} //To avoid the duplicate children item
      renderItem={({item}) => {
        return (
          <>
            <ListItem navigation={navigation} singleMedia={item} />
          </>
        );
      }}
    />
  );
};
List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
