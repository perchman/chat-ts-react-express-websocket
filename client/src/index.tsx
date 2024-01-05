import React from "react";
import ReactDOM from "react-dom/client";
import {HashRouter} from "react-router-dom";

import App from "./App";

import "./style.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
    throw new Error("HTML element 'root' is null");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);