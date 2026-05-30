import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  Share,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { FileText } from "lucide-react-native";

import {
  getSnippetById,
  deleteSnippet,
} from "../../database/snippetService";
import { saveCodeFile } from "../../services/fileService";
import { explainCode } from "../../services/aiService";
import { Snippet } from "../../types/snippet";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const data = getSnippetById(Number(id));
    setSnippet(data);
  }, [id]);

  const handleExplain = async () => {
    try {
      if (!snippet) return;
      const result = await explainCode(snippet.code);
      setAiResponse(result);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to explain code.");
    }
  };

  const handleShare = async () => {
    if (!snippet) return;
    try {
      await Share.share({
        message: `${snippet.title}\n\n${snippet.code}`,
        title: snippet.title,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to share the snippet.");
    }
  };

  if (!snippet) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#020617" }}>
        <Text style={{ color: "#f8fafc", padding: 20 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

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
        <FileText color="#38bdf8" size={28} />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              color: "#f8fafc",
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            {snippet.title}
          </Text>
          <Text style={{ color: "#94a3b8", marginTop: 4 }}>
            {snippet.language} • {snippet.tags || "No tags"}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: "#94a3b8",
          marginBottom: 18,
        }}
      >
        Added: {new Date(snippet.createdAt).toLocaleDateString()}
      </Text>

      <View
        style={{
          padding: 18,
          borderRadius: 16,
          backgroundColor: "#111827",
          borderWidth: 1,
          borderColor: "#334155",
          marginBottom: 24,
        }}
      >
        <Text style={{ color: "#f8fafc", lineHeight: 22 }}>
          {snippet.code}
        </Text>
      </View>

      <View>
        <Button
          title="Edit Snippet"
          onPress={() => router.push(`/edit/${snippet.id}`)}
        />
        <View style={{ height: 10 }} />
        <Button
          title="Export JS"
          onPress={async () => {
            await saveCodeFile(`${snippet.title}.js`, snippet.code);
            Alert.alert("Success", "File exported successfully.");
          }}
        />
        <View style={{ height: 10 }} />
        <Button title="Share Snippet" onPress={handleShare} />
        <View style={{ height: 10 }} />
        <Button title="Explain Code" onPress={handleExplain} />
      </View>

      {aiResponse ? (
        <View
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 16,
            backgroundColor: "#111827",
            borderWidth: 1,
            borderColor: "#334155",
          }}
        >
          <Text
            style={{
              color: "#f8fafc",
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            AI Explanation
          </Text>
          <Text style={{ color: "#cbd5e1", lineHeight: 22 }}>
            {aiResponse}
          </Text>
        </View>
      ) : null}

      <View style={{ height: 20 }} />

      <Button
        title="Delete Snippet"
        color="red"
        onPress={() => {
          deleteSnippet(snippet.id!);
          router.replace("/");
        }}
      />
    </ScrollView>
  );
}
