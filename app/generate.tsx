import React, {
  useState,
} from "react";

import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
} from "react-native";

import { generateCode }
from "../services/aiService";

export default function GenerateScreen() {
  const [prompt, setPrompt] =
    useState("");

  const [result, setResult] =
    useState("");

  const handleGenerate =
    async () => {
      const code =
        await generateCode(
          prompt
        );

      setResult(code);
    };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Describe code..."
        value={prompt}
        onChangeText={setPrompt}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button
        title="Generate Code"
        onPress={handleGenerate}
      />

      <Text
        style={{
          marginTop: 20,
        }}
      >
        {result}
      </Text>
    </ScrollView>
  );
}