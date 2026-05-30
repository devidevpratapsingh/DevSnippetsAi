import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const ROOT =
  FileSystem.Paths.document.uri +
  "snippets/";
export const createRootFolder =
  async () => {
    const info =
      await FileSystem.getInfoAsync(ROOT);

    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(
        ROOT,
        {
          intermediates: true,
        }
      );
    }
  };

export const getFiles =
  async () => {
    return await FileSystem.readDirectoryAsync(
      ROOT
    );
  };

export const deleteFile =
  async (fileName: string) => {
    await FileSystem.deleteAsync(
      ROOT + fileName
    );
  };

export const saveCodeFile =
  async (
    fileName: string,
    content: string
  ) => {
    const path =
      ROOT + fileName;

    await FileSystem.writeAsStringAsync(
      path,
      content
    );

    return path;
  };

export const importCodeFile =
  async () => {
    const result =
      await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

    if (result.canceled) {
      return null;
    }

    const file =
      result.assets[0];

    const content =
      await FileSystem.readAsStringAsync(
        file.uri
      );

    return {
      name: file.name,
      content,
    };
  };