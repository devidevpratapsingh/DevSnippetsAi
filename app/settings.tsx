import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
  const [apiKey, setApiKey] =
    useState("");

  const saveApiKey = async () => {
    await SecureStore.setItemAsync(
      "OPENROUTER_API_KEY",
      apiKey
    );

    Alert.alert(
      "Success",
      "API Key Saved"
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <TextInput
        placeholder="OpenRouter API Key"
        value={apiKey}
        onChangeText={setApiKey}
        secureTextEntry
      />

      <Button
        title="Save API Key"
        onPress={saveApiKey}
      />
    </View>
  );
}