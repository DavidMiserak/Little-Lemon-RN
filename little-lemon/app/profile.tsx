import { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { getUser, EmailNotificationsType, resetUser, setUser, UserType } from "../user";

function Profile() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState<EmailNotificationsType>({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    getUser().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setEmailNotifications(user.emailNotifications);
      setProfileImage(user.image);
    });
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
      const user: UserType = await getUser();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phone = phone;
      user.emailNotifications = emailNotifications;
      user.image = profileImage;

      const firstNameInitial = firstName ? firstName[0] : '';
      const lastNameInitial = lastName ? lastName[0] : '';
      user.initials = `${firstNameInitial}${lastNameInitial}`;

      await setUser(user);
      router.push("/menu");
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  }

  const clearProfile = async () => {
    resetUser();
    router.replace("/");
  }

  const resetProfile = async () => {
    getUser().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setEmailNotifications(user.emailNotifications);
      setProfileImage(user.image);
    });
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
          ) : (
            <Text style={[styles.image, styles.placeholder]}>
              {firstName ? firstName[0] : ''}
              {lastName ? lastName[0] : ''}
            </Text>
          )
          }
          <Pressable style={styles.profileButton} onPress={pickImage}>
            <Text style={styles.profileButtonText}>Change</Text></Pressable>
          <Pressable
            style={
              profileImage
                ? styles.profileButton
                : [styles.profileButton, styles.profileButtonDisabled]
            }
            onPress={() => setProfileImage(null)}
            disabled={!profileImage}
          >
            <Text style={profileImage ? styles.profileButtonText : styles.profileButtonDisabledText}>
              Remove
            </Text>
          </Pressable>
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
        <Pressable
          onPress={() => clearProfile()}
          style={styles.logout}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
        <View style={styles.changeArea}>
          <Pressable
            style={styles.discardButton}
            onPress={() => resetProfile()}
          >
            <Text style={styles.discardButtonText}>Discard Changes</Text>
          </Pressable>
          <Pressable
            style={styles.saveButton}
            onPress={() => saveProfile()}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>
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
    paddingVertical: 30,
  },
  profileButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F4CE14",
  },
  profileButtonDisabled: {
    backgroundColor: "lightgray",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  profileButtonText: {
    color: "#333333",
    fontWeight: "bold",
  },
  profileButtonDisabledText: {
    color: "gray",
    fontWeight: "bold",
  },
  logout: {
    padding: 10,
    margin: 20,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#F4CE14",
  },
  logoutText: {
    color: "#333333",
    fontWeight: "bold",
  },
  changeArea: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 20,
  },
  saveButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#495E57",
  },
  saveButtonText: {
    color: "#EDEFEE",
    fontWeight: "bold",
  },
  discardButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
    borderWidth: 2,
    borderColor: "gray",
  },
  discardButtonText: {
    color: "#333333",
    fontWeight: "bold",
  },
});
