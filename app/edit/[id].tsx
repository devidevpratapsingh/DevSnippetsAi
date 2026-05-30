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

export default function EditScreen() {
  const { id } = useLocalSearchParams();

  const [title, setTitle] =
    useState("");

  const [code, setCode] =
    useState("");

  const [language, setLanguage] =
    useState("");

  useEffect(() => {
    const snippet =
      getSnippetById(Number(id));

    if (snippet) {
      setTitle(snippet.title);
      setCode(snippet.code);
      setLanguage(
        snippet.language
      );
    }
  }, []);

  const saveChanges = () => {
    updateSnippet(Number(id), {
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
      />

      <TextInput
        value={language}
        onChangeText={setLanguage}
        placeholder="Language"
      />

      <TextInput
        value={code}
        onChangeText={setCode}
        multiline
        placeholder="Code"
      />

      <Button
        title="Update"
        onPress={saveChanges}
      />
    </View>
  );
}