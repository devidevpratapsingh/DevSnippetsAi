import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    loadKey();
  }, []);

  const loadKey = async () => {
    const saved =
      await SecureStore.getItemAsync(
        "OPENROUTER_API_KEY"
      );

    if (saved) {
      setApiKey(saved);
    }
  };

  const saveKey = async () => {
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
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="Enter OpenRouter API Key"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button
        title="Save API Key"
        onPress={saveKey}
      />
    </View>
  );
}