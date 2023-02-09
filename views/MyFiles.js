import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';

const MyFiles = ({navigation}) => {
  return <List navigation={navigation} myFilesOnly={true} />;
};

export default MyFiles;

MyFiles.propTypes = {
  navigation: PropTypes.object,
};
const styles = StyleSheet.create({});
