import { useEffect } from "react";
import { getAllSnippets } from "../database/snippetService";
import { useSnippetStore } from "../store/snippetStore";

export const useSnippets = () => {
  const { snippets, setSnippets } = useSnippetStore();

  const loadSnippets = () => {
    const data = getAllSnippets();
    setSnippets(data);
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  return {
    snippets,
    loadSnippets,
  };
};