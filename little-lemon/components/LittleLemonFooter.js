import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const LittleLemonFooter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heroText}>
        All rights reserved by Little Lemon, 2022{' '}
      </Text>
    </View>
  );
}

export default LittleLemonFooter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4CE14',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});
