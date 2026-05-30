import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import { Settings2 } from "lucide-react-native";
import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    loadKey();
  }, []);

  const loadKey = async () => {
    const saved = await SecureStore.getItemAsync("OPENROUTER_API_KEY");
    if (saved) {
      setApiKey(saved);
    }
  };

  const saveKey = async () => {
    await SecureStore.setItemAsync("OPENROUTER_API_KEY", apiKey);
    Alert.alert("Success", "API Key Saved");
  };

  return (
    <ScrollView
      style={{ flex: 1, padding: 20, backgroundColor: "#020617" }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <Settings2 color="#38bdf8" size={28} />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              color: "#f8fafc",
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            Settings
          </Text>
          <Text style={{ color: "#94a3b8", marginTop: 4 }}>
            Securely store your OpenRouter API key.
          </Text>
        </View>
      </View>

      <TextInput
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="Enter OpenRouter API Key"
        autoCapitalize="none"
        placeholderTextColor="#94a3b8"
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          padding: 14,
          borderRadius: 14,
          color: "#f8fafc",
          backgroundColor: "#0f172a",
          marginBottom: 20,
        }}
      />

      <Button title="Save API Key" onPress={saveKey} />
    </ScrollView>
  );
}
