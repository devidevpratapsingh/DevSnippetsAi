import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Button,
  Text,
  ScrollView,
  
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router, useFocusEffect } from "expo-router";
import {
  PlusCircle,
  Heart,
  FileText,
  Code2,
  UploadCloud,
  Settings2,
} from "lucide-react-native";

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

    const results = searchSnippets(text);

    setSnippets(results);
  };

  useFocusEffect(
    useCallback(() => {
      loadSnippets();
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#020617",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            color: "#f8fafc",
            fontSize: 32,
            fontWeight: "800",
            marginBottom: 6,
          }}
        >
          DevSnippets
        </Text>

        <Text
          style={{
            color: "#94a3b8",
            marginBottom: 20,
            fontSize: 16,
          }}
        >
          Save, search and explain your developer snippets offline.
        </Text>

        <SearchBar
          value={query}
          onChangeText={handleSearch}
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {[
            {
              label: "Create",
              description: "Save a new snippet quickly",
              route: "/create",
              Icon: PlusCircle,
            },
            {
              label: "Favorites",
              description: "Review your saved favorites",
              route: "/favorites",
              Icon: Heart,
            },
            {
              label: "Files",
              description: "Manage saved code files",
              route: "/files",
              Icon: FileText,
            },
            {
              label: "AI",
              description: "Generate code with AI",
              route: "/generate",
              Icon: Code2,
            },
            {
              label: "Import",
              description: "Import snippets from files",
              route: "/import",
              Icon: UploadCloud,
            },
            {
              label: "Settings",
              description: "Manage your API key",
              route: "/settings",
              Icon: Settings2,
            },
          ].map((item) => (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.route)}
              style={({ pressed }) => ({
                width: "48%",
                backgroundColor: pressed ? "#111827" : "#1e293b",
                borderRadius: 18,
                padding: 18,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#334155",
              })}
            >
              <item.Icon color="#38bdf8" size={22} />
              <Text
                style={{
                  color: "#f8fafc",
                  fontSize: 16,
                  fontWeight: "700",
                  marginTop: 12,
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{
                  color: "#94a3b8",
                  marginTop: 6,
                  fontSize: 13,
                }}
              >
                {item.description}
              </Text>
            </Pressable>
          ))}
        </View>

        {snippets.length === 0 ? (
          <View
            style={{
              padding: 20,
              backgroundColor: "#111827",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#334155",
            }}
          >
            <Text
              style={{
                color: "#cbd5e1",
                fontSize: 16,
              }}
            >
              No snippets saved yet. Tap Create Snippet to add your first developer resource.
            </Text>
          </View>
        ) : (
          <FlatList
            data={snippets}
            keyExtractor={(item) => item.id!.toString()}
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
                onPress={() =>
                  router.push(`/details/${item.id}`)
                }
              />
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}