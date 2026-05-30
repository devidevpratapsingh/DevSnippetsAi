import { View, Text } from "react-native";
import { Heart, Trash2 } from "lucide-react-native";
import { Snippet } from "../types/snippet";

interface Props {
  snippet: Snippet;
  onDelete: () => void;
  onFavorite: () => void;
}

export default function SnippetCard({
  snippet,
  onDelete,
  onFavorite,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#1e293b",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {snippet.title}
      </Text>

      <Text style={{ color: "#38bdf8" }}>
        {snippet.language}
      </Text>

      <Text style={{ color: "#cbd5e1" }}>
        {snippet.code}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <Heart
          color={
            snippet.favorite
              ? "red"
              : "gray"
          }
          onPress={onFavorite}
        />

        <Trash2
          color="red"
          onPress={onDelete}
        />
      </View>
    </View>
  );
}