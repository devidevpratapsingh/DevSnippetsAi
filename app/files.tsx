import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import { FileText } from "lucide-react-native";
import { useFocusEffect, router } from "expo-router";

import {
  createRootFolder,
  getFiles,
  deleteFile,
} from "../services/fileService";

export default function FilesScreen() {
  const [files, setFiles] = useState<string[]>([]);

  const loadFiles = async () => {
    const data = await getFiles();
    setFiles(data);
  };

  useEffect(() => {
    createRootFolder();
    loadFiles();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020617" }}>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FileText color="#38bdf8" size={28} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                color: "#f8fafc",
                fontSize: 26,
                fontWeight: "800",
              }}
            >
              Files
            </Text>
            <Text style={{ color: "#94a3b8", marginTop: 4 }}>
              Browse and remove saved code files.
            </Text>
          </View>
        </View>

        <Button title="Import" onPress={() => router.push("/import")} />
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <Button title="Refresh Files" onPress={loadFiles} />
      </View>

      <FlatList
        contentContainerStyle={{ padding: 20, paddingTop: 8 }}
        data={files}
        keyExtractor={(item) => item}
        ListEmptyComponent={
          <View style={{ marginTop: 24 }}>
            <Text style={{ color: "#cbd5e1" }}>
              No saved files yet. Import or export snippets to keep local copies.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 15,
              padding: 16,
              borderRadius: 16,
              backgroundColor: "#111827",
              borderWidth: 1,
              borderColor: "#334155",
            }}
          >
            <Text style={{ color: "#f8fafc", marginBottom: 10 }}>
              {item}
            </Text>

            <Button
              title="Delete"
              color="red"
              onPress={async () => {
                await deleteFile(item);
                loadFiles();
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
