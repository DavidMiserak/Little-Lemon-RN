import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const Onboarding = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const onSubmit = async () => {
    if (isNameValid && isEmailValid) {
      try {
        await AsyncStorage.setItem("user", JSON.stringify({ firstName, email }));
        router.replace("/profile");
      } catch (error) {
        console.error('Failed to save user data', error);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView indicatorStyle={"white"}>
        <View style={styles.fieldArea}>
          <Text style={styles.heroTitle}>
            Let us get to know you
          </Text>
          <Text style={styles.fieldLabel}>First Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setIsNameValid(text.length > 0);
            }}
          />
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailValid(validateEmail(text));
            }}
            inputMode="email"
          />
        </View>
        <View style={styles.buttonArea}>
          <Pressable
            disabled={!isNameValid || !isEmailValid}
            style={isNameValid && isEmailValid ? styles.button : styles.buttonDisabled}
            onPress={onSubmit}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE3E3',
    color: '#495E57',
  },
  heroTitle: {
    fontSize: 24,
    padding: 40,
    color: '#495E57',
    textAlign: 'center',
    marginBottom: 50,
  },
  fieldArea: {
    backgroundColor: 'silver',
    padding: 20,
  },
  textInput: {
    backgroundColor: 'silver',
    color: '#495E57',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 40,
    marginBottom: 20,
  },
  fieldLabel: {
    color: '#495E57',
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  buttonArea: {
    backgroundColor: '#DEE3E3',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 120,
    backgroundColor: 'silver',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonDisabled: {
    backgroundColor: '#EDEFEE',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 120,
    borderRadius: 8,
    padding: 10,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 20,
    color: '#495E57',
    textAlign: 'center',
  },
});
