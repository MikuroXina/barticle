import React, { FC } from "react";
import ReactDom from "react-dom";
import { Grid } from "./grid";
import { useAppState } from "./state";

const Index: FC = () => {
  const [state, _] = useAppState();

  return (
    <main>
      <Grid notes={state.notes} onNotesChanged={() => {}} />
    </main>
  );
};

ReactDom.render(<Index />, document.getElementById("root"));
