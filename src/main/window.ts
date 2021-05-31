import path from "path";
import { BrowserWindow } from "electron";
import { isDev } from "./constants";

export async function newWindow(): Promise<void> {
  const window = new BrowserWindow({
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
  }
  window.loadFile("dist/index.html");

  window.once("ready-to-show", window.show);
}
