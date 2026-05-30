import { View, Text, Button } from "react-native";
import {
  useLocalSearchParams,
  router,
} from "expo-router";
import { useEffect, useState } from "react";

import {
  getSnippetById,
  deleteSnippet,
} from "../../database/snippetService";
import {
  saveCodeFile,
} from "../../services/fileService";
import { Snippet } from "../../types/snippet";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  const [snippet, setSnippet] =
    useState<Snippet | null>(null);

  useEffect(() => {
    const data = getSnippetById(
      Number(id)
    );

    setSnippet(data);
  }, [id]);

  if (!snippet) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {snippet.title}
      </Text>

      <Text>{snippet.language}</Text>

      <Text>{snippet.code}</Text>

      <Button
        title="Edit"
        onPress={() =>
          router.push(
            `/edit/${snippet.id}`
          )
        }
      />
      <Button
        title="Export JS"
        onPress={async () => {
          await saveCodeFile(
            `${snippet.title}.js`,
            snippet.code
          );
        }}
      />

      <Button
        title="Delete"
        color="red"
        onPress={() => {
          deleteSnippet(
            snippet.id!
          );

          router.replace("/");
        }}
      />
    </View>
  );
}