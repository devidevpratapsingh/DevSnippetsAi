import {
  View,
  FlatList,
  Text,
} from "react-native";

import {
  useFocusEffect,
} from "expo-router";

import {
  useCallback,
  useState,
} from "react";

import {
  getFavoriteSnippets,
} from "../database/snippetService";

import { Snippet } from "../types/snippet";

import SnippetCard from "../components/SnippetCard";

export default function FavoritesScreen() {
  const [snippets, setSnippets] =
    useState<Snippet[]>([]);

  const loadFavorites = () => {
    const data =
      getFavoriteSnippets();

    setSnippets(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <FlatList
        data={snippets}
        keyExtractor={(item) =>
          item.id!.toString()
        }
        ListEmptyComponent={
          <Text>
            No Favorites Yet
          </Text>
        }
        renderItem={({ item }) => (
          <SnippetCard
            snippet={item}
            onDelete={() => {}}
            onFavorite={() => {}}
          />
        )}
      />
    </View>
  );
}