import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log('json res from dofetch', json);
    if (!response.ok) {
      const message = json.error
        ? `${json.message}:${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};
const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };

    return await doFetch(baseUrl + 'login', options);
  };
  return {postLogin};
};
const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };

    return await doFetch(baseUrl + 'users/user', options);
  };

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    return await doFetch(baseUrl + 'users', options);
  };
  const putUser = async (userData, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(userData),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const checkUserName = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('checkUsername: ' + error.message);
    }
  };
  return {getUserByToken, postUser, checkUserName, putUser};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };
  return {getFilesByTag};
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          const allMedia = await fileResponse.json();
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
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postUpload: ' + error.message);
    }
  };
  return {mediaArray, postMedia};
};

export {useMedia, useAuthentication, useUser, useTag};
