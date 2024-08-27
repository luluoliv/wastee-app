import { Stack } from "expo-router";

import "../src/styles/global.css"
import "../src/styles/output.css"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
    </Stack>
  );
}
