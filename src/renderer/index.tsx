import React, { FC } from "react";
import ReactDom from "react-dom";

const Index: FC = () => <h1>Hello, world!</h1>;

ReactDom.render(<Index />, document.getElementById("root"));
