import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

const WelcomeScreen = () => {
  return (
    <ScrollView indicatorStyle={"white"} style={styles.container}>
      <Text style={styles.heroTitle}>
        Welcome to Little Lemon
      </Text>
      <Text style={styles.heroText}>
        Little Lemon is a charming neighborhood bistro that serves simple food
        and classic cocktails in a lively but casual environment. We would love
        to hear more about your experience with us!
      </Text>
    </ScrollView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  heroTitle: {
    padding: 40,
    fontSize: 50,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  heroText: {
    fontSize: 38,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
  },
});
