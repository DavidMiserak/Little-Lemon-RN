import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const LittleLemonHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>
        Little Lemon
      </Text>
    </View>
  );
}

export default LittleLemonHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4CE14',
  },
  textHeader: {
    padding: 40,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});
