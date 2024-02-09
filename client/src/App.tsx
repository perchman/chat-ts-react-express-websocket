import React from "react";
import { Routes, Route } from "react-router-dom";

import Intro from "./pages/Intro/Intro";
import Chat from "./pages/Chat/Chat";

export default function App() {
    return (
        <Routes>
            <Route index element={ <Intro/> }/>
            <Route path="/chat" element={ <Chat/> }/>
        </Routes>
    );
}