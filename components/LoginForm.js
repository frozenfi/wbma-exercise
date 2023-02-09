import {Button, Text, Input, Card} from '@rneui/themed';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication, useUser} from '../hooks/ApiHooks';
import {useContext} from 'react';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
    }
  };

  return (
    <Card>
      <Card.Title>Login Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 5,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min. 5 chars) is required .</Text>}

      <Button title="Sign in" onPress={handleSubmit(logIn)} />
    </Card>
  );
};

export default LoginForm;
