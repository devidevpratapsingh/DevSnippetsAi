import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import { PlusCircle } from "lucide-react-native";

import { router } from "expo-router";
import { createSnippet } from "../database/snippetService";

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");

  const saveSnippet = () => {
    if (!title.trim() || !code.trim() || !language.trim()) {
      Alert.alert("Missing fields", "Title, language, and code are required.");
      return;
    }

    createSnippet({
      title,
      code,
      language,
      tags,
      favorite: 0,
      createdAt: new Date().toISOString(),
    });

    Alert.alert("Success", "Snippet saved.");
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
        <PlusCircle color="#38bdf8" size={28} />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              color: "#f8fafc",
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            Create Snippet
          </Text>
          <Text style={{ color: "#94a3b8", marginTop: 4 }}>
            Add a new snippet to your collection.
          </Text>
        </View>
      </View>

      <TextInput
        placeholder="Title"
        placeholderTextColor="#94a3b8"
        value={title}
        onChangeText={setTitle}
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
        placeholder="Language"
        placeholderTextColor="#94a3b8"
        value={language}
        onChangeText={setLanguage}
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
        placeholder="Tags (comma separated)"
        placeholderTextColor="#94a3b8"
        value={tags}
        onChangeText={setTags}
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
        placeholder="Code"
        placeholderTextColor="#94a3b8"
        value={code}
        onChangeText={setCode}
        multiline
        textAlignVertical="top"
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

      <Button title="Save Snippet" onPress={saveSnippet} />
    </ScrollView>
  );
}
