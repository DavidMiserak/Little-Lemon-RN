import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const LittleLemonFooter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>
        All rights reserved by Little Lemon, {new Date().getFullYear()}
      </Text>
    </View>
  );
}

export default LittleLemonFooter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CBD2D1',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    padding: 5,
  },
});
