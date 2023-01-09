import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <List />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 180,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    marginLeft: 5,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default App;
