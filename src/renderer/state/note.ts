declare const noteIdNominal: unique symbol;

export type NoteId = string & { [noteIdNominal]: never };

export interface NotePos {
  channel: number;
  time: number;
}

export type NoteKind = "normal";

export interface Note {
  id: NoteId;
  pos: NotePos;
  kind: NoteKind;
  soundName: string;
}
