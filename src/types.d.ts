export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export type Notes = Note[];
