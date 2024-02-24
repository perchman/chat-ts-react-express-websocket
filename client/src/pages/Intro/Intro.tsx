import React, {useState} from "react";

import LoginForm from "./form/LoginForm";

import style from "./Intro.module.scss";

export default function Intro() {
    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Chat</h1>
            <LoginForm />
        </div>
    );
}