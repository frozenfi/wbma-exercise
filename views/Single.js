import {Text, Card, ListItem, Icon, Avatar} from '@rneui/themed';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';
import {Video} from 'expo-av';
import {useRef, useState, useEffect, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useUser, useFavourite, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';

const Single = ({route}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    media_type: type,
    file_id: fileId,
  } = route.params;
  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const [avatar, setAvatar] = useState('https//placekittens/180');
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);

  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();

  const getAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + userId);
      console.log(avatarArray);
      const avatar = avatarArray[0].filename;
      setAvatar(uploadUrl + avatar);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  const getOwnerInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const owner = await getUserById(userId, token);
      setOwner(owner);
    } catch (error) {
      console.log('Error in gettong owner info', error);
    }
  };
  const getLikes = async () => {
    try {
      const likes = await getFavouritesByFileId(fileId);
      setLikes(likes);
      likes.forEach((like) => {
        console.log('Like data', like);
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.log('Error in getting like', error);
    }
  };

  const likeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(fileId, token);
      getLikes();
      setUserLike(true);
    } catch (error) {
      console.log('Error in liking', error);
    }
  };

  const dislikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(fileId, token);
      response && setUserLike(false);
    } catch (e) {
      console.log('Error in disliking', e);
    }
  };
  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error('Error in screen orientation unlock', error.message);
    }
  };
  const lock = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.error('Error in screen orientation lock', error.message);
    }
  };
  const showVideoInFullScreen = async () => {
    try {
      await video.current.presentFullscreenPlayer();
    } catch (error) {
      console.error('showVideoInFullScreen', error.message);
    }
  };
  useEffect(() => {
    getOwnerInfo();
    getAvatar();
    getLikes();
    unlock();

    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        if (video.current) showVideoInFullScreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lock();
    };
  }, []);

  useEffect(() => {
    getLikes();
  }, [userLike]);

  return (
    <Card>
      <Card.Title>{title}</Card.Title>

      <Card.Divider />
      {type === 'image' ? (
        <Card.Image source={{uri: uploadUrl + filename}} />
      ) : (
        <Video
          ref={video}
          style={{height: '40%', width: '100%'}}
          source={{uri: uploadUrl + filename}}
          useNativeControls
          isLooping
          resizeMode="contain"
          onError={(error) => {
            console.log(error);
          }}
        />
      )}
      <Card.Divider />
      {description && (
        <ListItem>
          <Text>{description}</Text>
        </ListItem>
      )}

      <ListItem>
        <Icon name="time" type="ionicon" />
        <Text> {new Date(timeAdded).toLocaleString('fi-FI')}</Text>
      </ListItem>
      <ListItem>
        <Avatar rounded size="medium" source={{uri: avatar}} />
        <Text>
          {' '}
          {owner.username} ({owner.full_name})
        </Text>
      </ListItem>
      <ListItem>
        {userLike ? (
          <Icon
            name="heart"
            type="material-community"
            size={30}
            onPress={() => {
              dislikeFile();
            }}
            color="red"
          />
        ) : (
          <Icon
            name="heart-outline"
            type="ionicon"
            size={30}
            onPress={() => {
              likeFile();
              getLikes();
            }}
          />
        )}

        <Text>
          {' '}
          {likes.length} {likes.length > 1 ? 'likes' : 'like'}
        </Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};
export default Single;
