import React, {useState} from "react";

import LoginForm from "./form/LoginForm";
import UserMessage from "../Chat/Messages/UserMessage/UserMessage";
import style from "./Intro.module.css";
import SystemMessage from "../Chat/Messages/SystemMessage/SystemMessage";

export default function Intro() {
    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Chat</h1>
            <LoginForm />
        </div>
    );
}