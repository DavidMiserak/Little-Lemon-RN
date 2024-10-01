import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Index() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const { firstName, email } = JSON.parse(user);
          setFirstName(firstName);
          setEmail(email);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    }

    fetchUser();
  }, []);

  return (
    email && firstName
      ? <Redirect href="/profile" />
      : <Redirect href="/onboarding" />
  );
}

export default Index;
