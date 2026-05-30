// import {
//   View,
//   Button,
//   FlatList,
//   Text,
// } from "react-native";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   createRootFolder,
//   getFiles,
//   deleteFile,
// } from "../services/fileService";

// export default function FilesScreen() {
//   const [files, setFiles] =
//     useState<string[]>([]);

//   const loadFiles =
//     async () => {
//       const data =
//         await getFiles();

//       setFiles(data);
//     };

//   useEffect(() => {
//     createRootFolder();
//     loadFiles();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 20,
//       }}
//     >
//       <Button
//         title="Refresh"
//         onPress={loadFiles}
//       />

//       <FlatList
//         data={files}
//         renderItem={({ item }) => (
//           <View>
//             <Text>{item}</Text>

//             <Button
//               title="Delete"
//               onPress={async () => {
//                 await deleteFile(
//                   item
//                 );

//                 loadFiles();
//               }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
} from "react-native";

import { useFocusEffect } from "expo-router";

import {
  getFiles,
  deleteFile,
} from "../services/fileService";

export default function FilesScreen() {
  const [files, setFiles] = useState<string[]>([]);

  const loadFiles = async () => {
    const data = await getFiles();
    setFiles(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadFiles();
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
        data={files}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 15,
            }}
          >
            <Text>{item}</Text>

            <Button
              title="Delete"
              color="red"
              onPress={async () => {
                await deleteFile(item);
                loadFiles();
              }}
            />
          </View>
        )}
      />
    </View>
  );
}