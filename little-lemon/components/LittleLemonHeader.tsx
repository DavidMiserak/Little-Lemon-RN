import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

const LittleLemonHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        alt="Little Lemon Logo"
        style={styles.logo}
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
      />
    </View>
  );
}

export default LittleLemonHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CBD2D1',
    paddingTop: 50,
    paddingBottom: 10,
  },
  logo: {
    width: 250,
    height: 50,
    alignSelf: 'center',
  },
});
