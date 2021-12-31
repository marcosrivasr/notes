export interface Note {
  id: string;
  title: string;
  content: Draft.DraftModel.Encoding.RawDraftContentState | undefined;
  createdAt: number;
}

export interface Notes {
  noteItems: Note[];
  selected: Note | null;
}
