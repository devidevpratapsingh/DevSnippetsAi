import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Button,
} from "react-native";

import {
  router,
  useFocusEffect,
} from "expo-router";

import { useSnippets } from "../hooks/useSnippets";
import { useSnippetStore } from "../store/snippetStore";

import SnippetCard from "../components/SnippetCard";
import SearchBar from "../components/SearchBar";

import {
  searchSnippets,
  deleteSnippet,
  toggleFavorite,
} from "../database/snippetService";

export default function HomeScreen() {
  const { snippets, loadSnippets } =
    useSnippets();

  const { setSnippets } =
    useSnippetStore();

  const [query, setQuery] =
    useState("");

  const handleSearch = (
    text: string
  ) => {
    setQuery(text);

    if (!text.trim()) {
      loadSnippets();
      return;
    }

    const results =
      searchSnippets(text);

    setSnippets(results as any);
  };

  useFocusEffect(
    useCallback(() => {
      loadSnippets();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <SearchBar
        value={query}
        onChangeText={handleSearch}
      />

      <Button
        title="Create Snippet"
        onPress={() =>
          router.push("/create")
        }
      />

      <Button
        title="Favorites"
        onPress={() =>
          router.push("/favorites")
        }
      />
      <Button
        title="Files"
        onPress={() =>
          router.push("/files")
        }
      />
      <Button
        title="Settings"
        onPress={() =>
          router.push("/settings")
        }
      />
      <Button
        title="AI Generate"
        onPress={() =>
          router.push("/generate")
        }
      />
      <Button
        title="Import File"
        onPress={() =>
          router.push("/import")
        }
      />

      <FlatList
        data={snippets}
        keyExtractor={(item) =>
          item.id!.toString()
        }
        renderItem={({ item }) => (
          <SnippetCard
            snippet={item}
            onDelete={() => {
              deleteSnippet(item.id!);
              loadSnippets();
            }}
            onFavorite={() => {
              toggleFavorite(
                item.id!,
                item.favorite ? 0 : 1
              );

              loadSnippets();
            }}
          />
        )}
      />
    </View>
  );
}