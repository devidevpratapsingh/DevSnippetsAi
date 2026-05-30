import {
  View,
  FlatList,
  Text,
} from "react-native";

import {
  useSnippetStore,
} from "../store/snippetStore";

import SnippetCard from "../components/SnippetCard";

export default function FavoritesScreen() {
  const { snippets } =
    useSnippetStore();

  const favorites =
    snippets.filter(
      (item) =>
        item.favorite === 1
    );

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
        Favorites
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) =>
          item.id!.toString()
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