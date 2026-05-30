import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { UploadCloud } from "lucide-react-native";

import { importCodeFile } from "../services/fileService";

export default function ImportScreen() {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleImport = async () => {
    const file = await importCodeFile();
    if (!file) return;

    setFileName(file.name);
    setContent(file.content);
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
        <UploadCloud color="#38bdf8" size={28} />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              color: "#f8fafc",
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            Import File
          </Text>
          <Text style={{ color: "#94a3b8", marginTop: 4 }}>
            Import code snippets from a local file.
          </Text>
        </View>
      </View>

      <Button title="Import File" onPress={handleImport} />

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
          {fileName ? `Imported: ${fileName}` : "No file imported yet."}
        </Text>
        <Text style={{ color: "#cbd5e1", lineHeight: 22 }}>
          {content || "Imported file contents will appear here."}
        </Text>
      </View>
    </ScrollView>
  );
}
