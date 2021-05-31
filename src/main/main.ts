import os from "os";
import path from "path";
import { app, session } from "electron";
import { newWindow } from "./window";
import { isDev } from "./constants";

app.whenReady().then(async () => {
  if (isDev) {
    const reactDevToolsPath = path.join(
      os.homedir(),
      os.platform() === "darwin"
        ? "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.13.5_1"
        : "/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.13.5_1",
    );
    await session.defaultSession.loadExtension(reactDevToolsPath, {
      allowFileAccess: true,
    });
    console.log("React DevTools loaded");
  }

  await newWindow();
});

app.once("window-all-closed", app.quit);
