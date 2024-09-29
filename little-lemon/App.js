import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import WelcomeScreen from "./screens/WelcomeScreen";

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <LittleLemonHeader />
        <WelcomeScreen />
      </View>
      <View style={styles.footer}>
        <LittleLemonFooter />
      </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  footer: {
    backgroundColor: '#495E57',
  },
});
