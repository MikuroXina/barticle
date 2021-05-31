import { useReducer } from "react";
import { Action } from "./state/action";
import { Note } from "./state/note";

export * from "./state/action";
export * from "./state/note";

export interface State {
  notes: readonly Note[];
}

export interface Dispatch {
  (action: Action): void;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.note],
      };
    case "DEL_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.id),
      };
  }
}

export function useAppState(): [State, Dispatch] {
  return useReducer(reducer, {
    notes: [],
  });
}
