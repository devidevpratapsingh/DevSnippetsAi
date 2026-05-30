import db from "./database";
import { Snippet } from "../types/snippet";

export const createSnippet = (
  snippet: Snippet
) => {
  try {
    db.runSync(
      `
      INSERT INTO snippets
      (
        title,
        code,
        language,
        tags,
        favorite,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        snippet.title,
        snippet.code,
        snippet.language,
        snippet.tags,
        snippet.favorite,
        snippet.createdAt,
      ]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFavoriteSnippets =
  (): Snippet[] => {
    try {
      return db.getAllSync<Snippet>(
        `
        SELECT *
        FROM snippets
        WHERE favorite = 1
        ORDER BY id DESC
        `
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };
export const getAllSnippets = (): Snippet[] => {
  try {
    return db.getAllSync<Snippet>(
      `
      SELECT *
      FROM snippets
      ORDER BY id DESC
      `
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteSnippet = (id: number) => {
  try {
    db.runSync(
      `DELETE FROM snippets WHERE id = ?`,
      [id]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const toggleFavorite = (
  id: number,
  favorite: number
) => {
  try {
    db.runSync(
      `
      UPDATE snippets
      SET favorite = ?
      WHERE id = ?
      `,
      [favorite, id]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const searchSnippets = (
  query: string
): Snippet[] => {
  try {
    const pattern = `%${query}%`;

    return db.getAllSync<Snippet>(
      `
      SELECT *
      FROM snippets
      WHERE title LIKE ?
        OR code LIKE ?
        OR language LIKE ?
        OR tags LIKE ?
      ORDER BY id DESC
      `,
      [pattern, pattern, pattern, pattern]
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

// export const updateSnippet = (
//   id: number,
//   snippet: Snippet
// ) => {
//   try {
//     db.runSync(
//       `
//       UPDATE snippets
//       SET
//       title = ?,
//       code = ?,
//       language = ?,
//       tags = ?
//       WHERE id = ?
//       `,
//       [
//         snippet.title,
//         snippet.code,
//         snippet.language,
//         snippet.tags,
//         id,
//       ]
//     );

//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

export const getSnippetById = (
  id: number
): Snippet | null => {
  try {
    return (
      db.getFirstSync<Snippet>(
        `
        SELECT *
        FROM snippets
        WHERE id = ?
        `,
        [id]
      ) ?? null
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const updateSnippet = (
//   id: number,
//   snippet: Snippet
// ) => {
//   try {
//     db.runSync(
//       `
//       UPDATE snippets
//       SET
//         title = ?,
//         code = ?,
//         language = ?,
//         tags = ?
//       WHERE id = ?
//       `,
//       [
//         snippet.title,
//         snippet.code,
//         snippet.language,
//         snippet.tags,
//         id,
//       ]
//     );

//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };
export const updateSnippet = (
  id: number,
  snippet: Snippet
) => {
  try {
    db.runSync(
      `
      UPDATE snippets
      SET
        title = ?,
        code = ?,
        language = ?,
        tags = ?,
        favorite = ?
      WHERE id = ?
      `,
      [
        snippet.title,
        snippet.code,
        snippet.language,
        snippet.tags,
        snippet.favorite,
        id,
      ]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};