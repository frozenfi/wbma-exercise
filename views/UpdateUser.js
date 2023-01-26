import {Card, Button, Input} from '@rneui/themed';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PropTypes} from 'prop-types';
import {useContext} from 'react';

const UpdateUser = ({navigate}) => {
  const {putUser, checkUserName} = useUser();
  const {user, setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: user.username,
      password: '',
      confirmPassword: '',
      email: user.email,
      full_name: user.full_name,
    },
    mode: 'onBlur',
  });
  const update = async (modifyData) => {
    delete modifyData.confirmPassword;
    console.log('Modifying: ', modifyData);
    try {
      if (modifyData.password === '') {
        delete modifyData.password;
      }
      const modifyResult = await putUser(modifyData);
      console.log('Modification result', modifyResult);
    } catch (error) {
      console.error('register', error);
    }
  };
  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUserName(username);
      console.log('checkUser: ', userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser: ', error.message);
    }
  };

  return (
    <Card>
      <Card.Title>Update Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username min length is 3 characters.',
          },
          validate: checkUser,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message:
              'Minimum 5 characters, needs one number and one uppercase letter',
          },
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'min 5 characters, needs one number, one uppercase letter',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          validate: (value) => {
            if (value === getValues('password')) {
              return true;
            } else {
              return 'passwords must match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'email is required'},
          pattern: {
            value: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i,
            message: 'Must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{minLength: {value: 3, message: 'must be at least 3 chars'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />

      <Button title="Update!" onPress={handleSubmit(update)} />
    </Card>
  );
};

UpdateUser.propTypes = {
  navigation: PropTypes.object,
};
export default UpdateUser;
