import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react";
import { createStore, applymiddleware, compose } from "redux";
import thunk from "react-thunk";

import reducers from "./reducers";

import App from "./App";

const store = createStore(reducers, compose(applymiddleware(thunk)));

ReactDOM.render(<App />, document.getElementById('root'));
