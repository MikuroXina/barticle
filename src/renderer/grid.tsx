import React, { FC, useState } from "react";
import { Notes, Viewport } from "./grid/notes";
import type { NoteId, Note } from "./state";

interface GridState {
  viewport: Viewport;
}

export interface GridProps {
  notes: readonly Note[];
  onNotesChanged: (id: NoteId, note: Note) => void;
}

export const Grid: FC<GridProps> = ({ notes, onNotesChanged }) => {
  const [state, setState] = useState<GridState>({
    viewport: {
      timeRange: [0, 2],
      timeScale: 1.0,
      channelRange: [0, 8],
    },
  });
  return (
    <div>
      <Notes viewport={state.viewport} {...{ notes, onNotesChanged }} />
    </div>
  );
};
