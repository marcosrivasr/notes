export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export interface Notes {
  noteItems: Note[];
  selected: Note | null;
}
