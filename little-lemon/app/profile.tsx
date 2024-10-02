import { useState, useEffect } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";

function Profile() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const userObj = JSON.parse(user);
          setFirstName(userObj.firstName);
          setLastName(userObj.lastName);
          setEmail(userObj.email);
          setPhone(userObj.phone);
          setEmailNotifications(userObj.emailNotifications);
          setProfileImage(userObj.image);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    }

    fetchUser();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  }

  const saveProfile = async () => {
    try {
      const user = {
        firstName,
        lastName,
        email,
        phone,
        emailNotifications,
        image: profileImage,
      };
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  }

  const clearProfile = async () => {
    try {
      await AsyncStorage.clear();
      router.replace("/");
    } catch (error) {
      console.error('Failed to clear user data', error);
    }
  }

  const resetProfile = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const { firstName, email } = JSON.parse(user);
        setFirstName(firstName);
        setEmail(email);
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    } finally {
      setProfileImage(null);
      setLastName('');
      setPhone('');
      setEmailNotifications({
        orderStatuses: true,
        passwordChanges: true,
        specialOffers: true,
        newsletter: true,
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Personal Information</Text>
        <View style={styles.avatar}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.image}
            />
          ) : <Text style={[styles.image, styles.placeholder]}>{firstName[0]}{lastName[0]}</Text>
          }
          <Button
            title="Change"
            onPress={pickImage}
          />
          <Button
            title="Remove"
            disabled={!profileImage}
            onPress={() => setProfileImage(null)}
          />
        </View>
        <View>
          <Text>Fist Name:</Text>
          <TextInput
            style={styles.textFields}
            value={firstName}
            inputMode="text"
            onChangeText={setFirstName}
          />
          <Text>Last Name:</Text>
          <TextInput
            style={styles.textFields}
            value={lastName}
            inputMode="text"
            onChangeText={setLastName}
          />
          <Text>Email:</Text>
          <TextInput
            style={styles.textFields}
            value={email}
            onChangeText={setEmail}
            inputMode="email"
          />
          <Text>Phone:</Text>
          <MaskedTextInput
            style={styles.textFields}
            mask={"+1 (999) 999-9999"}
            value={phone}
            onChangeText={setPhone}
            inputMode="tel"
          />
        </View>

        <View>
          <Text style={styles.headerText}>Email Notifications:</Text>
          <View style={styles.switch}>
            <Switch
              value={emailNotifications.orderStatuses}
              onValueChange={(value: boolean) =>
                setEmailNotifications(prev => ({ ...prev, orderStatuses: value }))}
            />
            <Text>
              Order Statuses
            </Text>
          </View>
          <View style={styles.switch}>
            <Switch
              value={emailNotifications.passwordChanges}
              onValueChange={(value: boolean) =>
                setEmailNotifications(prev => ({ ...prev, passwordChanges: value }))}
            />
            <Text>
              Password Changes
            </Text>
          </View>
          <View style={styles.switch}>
            <Switch
              value={emailNotifications.specialOffers}
              onValueChange={(value: boolean) =>
                setEmailNotifications(prev => ({ ...prev, specialOffers: value }))}
            />
            <Text>
              Special Offers
            </Text>
          </View>
          <View style={styles.switch}>
            <Switch
              value={emailNotifications.newsletter}
              onValueChange={(value: boolean) =>
                setEmailNotifications(prev => ({ ...prev, newsletter: value }))}
            />
            <Text>
              Newsletter
            </Text>
          </View>
        </View>
        <View style={styles.logout}>
          <Button
            color="#F4CE14"
            title="Log Out"
            onPress={() => clearProfile()}
          />
        </View>
        <View style={styles.changeArea}>
          <Button
            title="Discard Changes"
            onPress={() => resetProfile()}
          />
          <Button
            title="Save Changes"
            onPress={() => saveProfile()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
  textFields: {
    width: 200,
    height: 40,
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  switch: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    backgroundColor: "lightgray",
    color: "gray",
    textAlign: "center",
    lineHeight: 100,
    fontSize: 40,
  },
  avatar: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingBottom: 20,
  },
  logout: {
    padding: 20,
  },
  changeArea: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 20,
  },
});
