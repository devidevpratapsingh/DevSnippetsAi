// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   Button,
//   Alert,
// } from "react-native";

// import {
//   useLocalSearchParams,
//   router,
// } from "expo-router";

// import * as SecureStore from "expo-secure-store";

// import {
//   getSnippetById,
//   deleteSnippet,
// } from "../../database/snippetService";

// import {
//   saveCodeFile,
// } from "../../services/fileService";

// import {
//   explainCode,
// } from "../../services/aiService";

// import { Snippet } from "../../types/snippet";

// export default function DetailScreen() {
//   const { id } = useLocalSearchParams();

//   const [snippet, setSnippet] =
//     useState<Snippet | null>(null);

//   const [aiResponse, setAiResponse] =
//     useState("");

//   useEffect(() => {
//     const data = getSnippetById(
//       Number(id)
//     );

//     setSnippet(data);
//   }, [id]);

//   const handleExplain = async () => {
//     try {
//       if (!snippet) return;

//       const apiKey =
//         await SecureStore.getItemAsync(
//           "OPENROUTER_API_KEY"
//         );

//       if (!apiKey) {
//         Alert.alert(
//           "Missing API Key",
//           "Please save your OpenRouter API key in Settings."
//         );
//         return;
//       }

//      const result =
//         await explainCode(
//           snippet.code
//         );

//       setAiResponse(result);
//     } catch (error) {
//       console.log(error);

//       Alert.alert(
//         "Error",
//         "Failed to explain code."
//       );
//     }
//   };

//   if (!snippet) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 20,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 24,
//           fontWeight: "bold",
//         }}
//       >
//         {snippet.title}
//       </Text>

//       <Text>
//         {snippet.language}
//       </Text>

//       <Text>
//         {snippet.code}
//       </Text>

//       <Button
//         title="Edit"
//         onPress={() =>
//           router.push(
//             `/edit/${snippet.id}`
//           )
//         }
//       />

//       <Button
//         title="Export JS"
//         onPress={async () => {
//           await saveCodeFile(
//             `${snippet.title}.js`,
//             snippet.code
//           );

//           Alert.alert(
//             "Success",
//             "File exported."
//           );
//         }}
//       />

//       <Button
//         title="Explain Code"
//         onPress={handleExplain}
//       />

//       {aiResponse ? (
//         <Text
//           style={{
//             marginTop: 20,
//           }}
//         >
//           {aiResponse}
//         </Text>
//       ) : null}

//       <Button
//         title="Delete"
//         color="red"
//         onPress={() => {
//           deleteSnippet(
//             snippet.id!
//           );

//           router.replace("/");
//         }}
//       />
//     </View>
//   );
// }


import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  getSnippetById,
  deleteSnippet,
} from "../../database/snippetService";

import {
  saveCodeFile,
} from "../../services/fileService";

import {
  explainCode,
} from "../../services/aiService";

import { Snippet } from "../../types/snippet";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  const [snippet, setSnippet] =
    useState<Snippet | null>(null);

  const [aiResponse, setAiResponse] =
    useState("");

  useEffect(() => {
    const data = getSnippetById(
      Number(id)
    );

    setSnippet(data);
  }, [id]);

  const handleExplain = async () => {
    try {
      if (!snippet) return;

      const result =
        await explainCode(
          snippet.code
        );

      setAiResponse(result);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to explain code."
      );
    }
  };

  if (!snippet) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {snippet.title}
      </Text>

      <Text
        style={{
          marginBottom: 10,
        }}
      >
        {snippet.language}
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        {snippet.code}
      </Text>

      <Button
        title="Edit"
        onPress={() =>
          router.push(
            `/edit/${snippet.id}`
          )
        }
      />

      <View
        style={{
          height: 10,
        }}
      />

      <Button
        title="Export JS"
        onPress={async () => {
          await saveCodeFile(
            `${snippet.title}.js`,
            snippet.code
          );

          Alert.alert(
            "Success",
            "File exported successfully."
          );
        }}
      />

      <View
        style={{
          height: 10,
        }}
      />

      <Button
        title="Explain Code"
        onPress={handleExplain}
      />

      {aiResponse ? (
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            AI Explanation:
          </Text>

          <Text>
            {aiResponse}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          height: 20,
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
    </ScrollView>
  );
}