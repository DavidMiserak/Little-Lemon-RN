import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";

function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/onboarding" style={styles.button}>
        Go to Onboarding
      </Link>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: "white",
    backgroundColor: "blue",
    borderRadius: 8,
    padding: 20,
    margin: 20,
  },
});
