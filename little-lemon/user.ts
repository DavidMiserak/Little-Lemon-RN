import AsyncStorage from '@react-native-async-storage/async-storage';

export type EmailNotificationsType = {
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
};

export const defaultEmailNotifications: EmailNotificationsType = {
  orderStatuses: true,
  passwordChanges: true,
  specialOffers: true,
  newsletter: true,
};

export type UserType = {
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  phone: string;
  image: string | null;
  emailNotifications: EmailNotificationsType;
};

export const blankUser: UserType = {
  firstName: "",
  lastName: "",
  initials: "LL",
  email: "",
  phone: "",
  image: "",
  emailNotifications: defaultEmailNotifications,
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const userObj: UserType = JSON.parse(user);
      return userObj;
    }
  } catch (error) {
    console.error('Failed to fetch user data', error);
  }
  return blankUser;
}

export const setUser = async (user: UserType) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user data', error);
  }
}

export const resetUser = async () => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(blankUser));
  } catch (error) {
    console.error('Failed to reset user data', error);
  }
}
