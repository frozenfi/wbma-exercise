import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';

const List = () => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      style={{padding: 10}}
      data={mediaArray}
      keyExtractor={(item) => item.title}
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
