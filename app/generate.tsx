import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { Code2 } from "lucide-react-native";

import { generateCode } from "../services/aiService";

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert("Enter a prompt", "Describe what you want the code to do.");
      return;
    }

    try {
      const code = await generateCode(prompt);
      setResult(code);
    } catch (error) {
      console.log(error);
      Alert.alert("AI error", "Unable to generate code right now.");
    }
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
        <Code2 color="#38bdf8" size={28} />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              color: "#f8fafc",
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            AI Generator
          </Text>
          <Text style={{ color: "#94a3b8", marginTop: 4 }}>
            Turn prompts into code snippets instantly.
          </Text>
        </View>
      </View>

      <TextInput
        placeholder="Describe the code you want..."
        placeholderTextColor="#94a3b8"
        value={prompt}
        onChangeText={setPrompt}
        multiline
        textAlignVertical="top"
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          padding: 16,
          borderRadius: 16,
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          minHeight: 140,
          marginBottom: 16,
        }}
      />

      <Button title="Generate Code" onPress={handleGenerate} />

      <View
        style={{
          padding: 16,
          borderRadius: 16,
          backgroundColor: "#111827",
          marginTop: 20,
          borderWidth: 1,
          borderColor: "#334155",
        }}
      >
        <Text
          style={{
            color: "#94a3b8",
            marginBottom: 10,
            fontWeight: "700",
          }}
        >
          Generated output
        </Text>
        <Text style={{ color: "#f8fafc", lineHeight: 22 }}>
          {result || "Your generated code will appear here."}
        </Text>
      </View>
    </ScrollView>
  );
}
