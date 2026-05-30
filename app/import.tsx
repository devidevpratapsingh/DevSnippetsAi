import { useState } from "react";
import {
  View,
  Text,
  Button,
} from "react-native";

import {
  importCodeFile,
} from "../services/fileService";

export default function ImportScreen() {
  const [content, setContent] =
    useState("");

  const handleImport =
    async () => {
      const file =
        await importCodeFile();

      if (!file) return;

      setContent(file.content);
    };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Button
        title="Import File"
        onPress={handleImport}
      />

      <Text
        style={{
          marginTop: 20,
        }}
      >
        {content}
      </Text>
    </View>
  );
}