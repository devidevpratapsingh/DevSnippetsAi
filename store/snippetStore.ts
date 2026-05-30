import { create } from "zustand";
import { Snippet } from "../types/snippet";

interface SnippetStore {
  snippets: Snippet[];

  setSnippets: (
    snippets: Snippet[]
  ) => void;
}

export const useSnippetStore =
  create<SnippetStore>((set) => ({
    snippets: [],

    setSnippets: (snippets) =>
      set({
        snippets,
      }),
  }));