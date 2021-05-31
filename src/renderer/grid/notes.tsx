import React, { FC, useEffect, useRef } from "react";
import type { NoteId, Note } from "../state";

export interface Viewport {
  timeRange: [number, number];
  timeScale: number;
  channelRange: [number, number];
}

export interface NotesProps {
  viewport: Viewport;
  notes: readonly Note[];
  onNotesChanged: (id: NoteId, note: Note) => void;
}

export const Notes: FC<NotesProps> = ({ viewport, notes, onNotesChanged }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    notes.forEach(renderNote(ctx, viewport));
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

const rowWidths = [2, 2, 4, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 4];
const rowShifts = rowWidths.map<number>(
  function (this: { prev: number }, width) {
    this.prev += width;
    return this.prev;
  },
  { prev: 0 },
);
const rowScale = 40;
const noteHeight = 20;
const noteColors = [
  "silver",
  "silver",
  "red",
  "white",
  "blue",
  "white",
  "blue",
  "white",
  "blue",
  "white",
  "silver",
  "white",
  "blue",
  "white",
  "blue",
  "white",
  "blue",
  "white",
  "red",
];

const renderNote =
  (ctx: CanvasRenderingContext2D, viewport: Viewport) => (note: Note) => {
    const { channel, time } = note.pos;
    if (
      viewport.timeRange[0] <= time &&
      time <= viewport.timeRange[1] &&
      viewport.channelRange[0] <= channel &&
      channel <= viewport.channelRange[1]
    ) {
      ctx.fillStyle = noteColors[channel];
      const x = rowShifts[channel] * rowScale;
      const y = time - viewport.timeRange[0];
      const w = rowWidths[channel] * rowScale;
      const h = noteHeight * viewport.timeScale;
      ctx.rect(x, y, w, h);
    }
  };
