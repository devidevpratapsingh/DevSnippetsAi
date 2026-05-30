import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { createSnippet } from "../database/snippetService";

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] =
    useState("");

  const saveSnippet = () => {
    createSnippet({
      title,
      code,
      language,
      tags: "",
      favorite: 0,
      createdAt:
        new Date().toISOString(),
    });

    Alert.alert(
      "Success",
      "Snippet Saved"
    );

    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Language"
        value={language}
        onChangeText={setLanguage}
      />

      <TextInput
        placeholder="Code"
        value={code}
        onChangeText={setCode}
        multiline
      />

      <Button
        title="Save Snippet"
        onPress={saveSnippet}
      />
    </View>
  );
}