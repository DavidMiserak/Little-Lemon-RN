import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from "expo-router";
import {
  getUser,
  UserType,
} from '../user';

const LittleLemonHeader = () => {
  const [initials, setInitials] = useState('LL');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    getUser().then((user: UserType) => {
      setInitials(user.initials);
      setProfileImage(user.image);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/">
        <View>
          <Image
            alt="Little Lemon Logo"
            style={styles.logo}
            source={require('../assets/images/logo.png')}
            resizeMode="contain"
          />
        </View>
      </Link>
      <Link href="/profile">
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text>{initials}</Text>
          </View>
        )
        }
      </Link>
    </View>
  );
}

export default LittleLemonHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CBD2D1',
    padding: 20,
    paddingTop: 40,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 185,
    height: 40,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  placeholder: {
    backgroundColor: "#F4CE14",
    color: "gray",
    textAlign: "center",
    fontSize: 25,
    borderRadius: 50,
    justifyContent: "center",
    padding: 15,
  },
});
