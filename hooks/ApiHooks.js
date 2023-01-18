import {useEffect, useState} from 'react';
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
  return {getUserByToken};
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

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
  }, []);
  return {mediaArray};
};

export {useMedia, useAuthentication, useUser};
