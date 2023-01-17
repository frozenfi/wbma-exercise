import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import List from './components/List';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <List />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
