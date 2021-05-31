import { Note, NoteId } from "./note";

export type Action =
  | { type: "ADD_NOTE"; note: Note }
  | { type: "DEL_NOTE"; id: NoteId };
