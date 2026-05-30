import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import { Edit3 } from "lucide-react-native";
import { useLocalSearchParams, router } from "expo-router";

import {
  getSnippetById,
  updateSnippet,
} from "../../database/snippetService";
import { Snippet } from "../../types/snippet";

export default function EditScreen() {
  const { id } = useLocalSearchParams();

  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const data = getSnippetById(Number(id));
    if (data) {
      setSnippet(data);
      setTitle(data.title);
      setCode(data.code);
      setLanguage(data.language);
      setTags(data.tags || "");
    }
  }, [id]);

  const saveChanges = () => {
    if (!snippet) return;

    updateSnippet(Number(id), {
      ...snippet,
      title,
      code,
      language,
      tags,
    });

    Alert.alert("Success", "Snippet Updated");
    router.back();
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
        <Edit3 color="#38bdf8" size={28} />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              color: "#f8fafc",
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            Edit Snippet
          </Text>
          <Text style={{ color: "#94a3b8", marginTop: 4 }}>
            Update the snippet details and code.
          </Text>
        </View>
      </View>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#94a3b8"
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          padding: 14,
          borderRadius: 14,
          color: "#f8fafc",
          backgroundColor: "#0f172a",
          marginBottom: 14,
        }}
      />

      <TextInput
        value={language}
        onChangeText={setLanguage}
        placeholder="Language"
        placeholderTextColor="#94a3b8"
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          padding: 14,
          borderRadius: 14,
          color: "#f8fafc",
          backgroundColor: "#0f172a",
          marginBottom: 14,
        }}
      />

      <TextInput
        value={tags}
        onChangeText={setTags}
        placeholder="Tags (comma separated)"
        placeholderTextColor="#94a3b8"
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          padding: 14,
          borderRadius: 14,
          color: "#f8fafc",
          backgroundColor: "#0f172a",
          marginBottom: 14,
        }}
      />

      <TextInput
        value={code}
        onChangeText={setCode}
        multiline
        placeholder="Code"
        placeholderTextColor="#94a3b8"
        style={{
          borderWidth: 1,
          borderColor: "#334155",
          padding: 14,
          borderRadius: 14,
          minHeight: 220,
          color: "#f8fafc",
          backgroundColor: "#0f172a",
          marginBottom: 18,
        }}
      />

      <Button title="Update Snippet" onPress={saveChanges} />
    </ScrollView>
  );
}
