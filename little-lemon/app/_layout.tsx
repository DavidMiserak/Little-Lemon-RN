import { Stack } from "expo-router";

import LittleLemonHeader from "../components/LittleLemonHeader";
import LittleLemonFooter from "../components/LittleLemonFooter";

function RootLayout() {
  return (
    <>
      <LittleLemonHeader />
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
      <LittleLemonFooter />
    </>
  );
}

export default RootLayout;
