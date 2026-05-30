export interface Snippet {
  id?: number;
  title: string;
  code: string;
  language: string;
  tags: string;
  favorite: number;
  imageUri?: string;
  createdAt: string;
}