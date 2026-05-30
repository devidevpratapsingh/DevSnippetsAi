import React, { useCallback, useState } from "react";
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
} from "react-native";
import { Heart } from "lucide-react-native";
import { useFocusEffect, router } from "expo-router";

import {
  deleteSnippet,
  toggleFavorite,
  getFavoriteSnippets,
} from "../database/snippetService";
import { Snippet } from "../types/snippet";
import SnippetCard from "../components/SnippetCard";

export default function FavoritesScreen() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const loadFavorites = () => {
    const data = getFavoriteSnippets();
    setSnippets(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020617" }}>
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Heart color="#38bdf8" size={28} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                color: "#f8fafc",
                fontSize: 26,
                fontWeight: "800",
              }}
            >
              Favorites
            </Text>
            <Text style={{ color: "#94a3b8", marginTop: 4 }}>
              Your most valuable snippets in one place.
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 20, paddingTop: 0 }}
        data={snippets}
        keyExtractor={(item) => item.id!.toString()}
        ListEmptyComponent={
          <Text style={{ color: "#cbd5e1" }}>
            No favorites yet. Mark snippets with the heart to save them here.
          </Text>
        }
        renderItem={({ item }) => (
          <SnippetCard
            snippet={item}
            onDelete={() => {
              deleteSnippet(item.id!);
              loadFavorites();
            }}
            onFavorite={() => {
              toggleFavorite(item.id!, 0);
              loadFavorites();
            }}
            onPress={() => router.push(`/details/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
