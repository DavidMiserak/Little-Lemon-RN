import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

const LittleLemonHeader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../images/logo.png')} />
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
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
