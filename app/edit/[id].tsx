import { useEffect, useState } from "react";

import {
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  getSnippetById,
  updateSnippet,
} from "../../database/snippetService";

import { Snippet } from "../../types/snippet";

export default function EditScreen() {
  const { id } = useLocalSearchParams();

  const [snippet, setSnippet] =
    useState<Snippet | null>(null);

  const [title, setTitle] =
    useState("");

  const [code, setCode] =
    useState("");

  const [language, setLanguage] =
    useState("");

  useEffect(() => {
    const data =
      getSnippetById(Number(id));

    if (data) {
      setSnippet(data);

      setTitle(data.title);
      setCode(data.code);
      setLanguage(data.language);
    }
  }, [id]);

  const saveChanges = () => {
    if (!snippet) return;

    updateSnippet(
      Number(id),
      {
        ...snippet,
        title,
        code,
        language,
      }
    );

    Alert.alert(
      "Success",
      "Snippet Updated"
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
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        value={language}
        onChangeText={setLanguage}
        placeholder="Language"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        value={code}
        onChangeText={setCode}
        multiline
        placeholder="Code"
        style={{
          borderWidth: 1,
          padding: 10,
          minHeight: 200,
          textAlignVertical: "top",
          marginBottom: 20,
        }}
      />

      <Button
        title="Update Snippet"
        onPress={saveChanges}
      />
    </View>
  );
}