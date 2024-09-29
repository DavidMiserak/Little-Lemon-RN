import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import OnboardingScreen from "./screens/OnboardingScreen";

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <LittleLemonHeader />
        <OnboardingScreen />
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
    backgroundColor: '#DEE3E3',
  },
  footer: {
    backgroundColor: '#DEE3E3',
  },
});
