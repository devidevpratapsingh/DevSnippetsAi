import { Pressable, View, Text } from "react-native";
import { Heart, Trash2, ChevronRight } from "lucide-react-native";
import { Snippet } from "../types/snippet";

interface Props {
  snippet: Snippet;
  onDelete: () => void;
  onFavorite: () => void;
  onPress?: () => void;
}

export default function SnippetCard({
  snippet,
  onDelete,
  onFavorite,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#0f172a" : "#1e293b",
        padding: 16,
        borderRadius: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#334155",
      })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text
            style={{
              color: "#f8fafc",
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            {snippet.title}
          </Text>

          <Text
            style={{
              color: "#38bdf8",
              marginBottom: 8,
            }}
          >
            {snippet.language}
          </Text>

          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{
              color: "#cbd5e1",
              lineHeight: 20,
            }}
          >
            {snippet.code}
          </Text>
        </View>

        <ChevronRight color="#94a3b8" />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <Text style={{ color: "#94a3b8" }}>
          {snippet.tags || "No tags"}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Heart
            color={snippet.favorite ? "#f97316" : "#64748b"}
            onPress={onFavorite}
          />
          <View style={{ width: 20 }} />
          <Trash2
            color="#ef4444"
            onPress={onDelete}
          />
        </View>
      </View>
    </Pressable>
  );
}