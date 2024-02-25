import React from "react";

import UserMessage from "./UserMessage/UserMessage";
import SystemMessage from "./SystemMessage/SystemMessage";

import style from './Message.module.scss';

interface User {
    username: string,
    color: string
}

interface SystemMessageInterface {
    type: "join" | "left",
    date: number,
    user: User
}

interface UserMassageInterface {
    type: "user",
    date: number,
    user: User,
    text: string
}

export default function Message({ data, key }: { data: SystemMessageInterface | UserMassageInterface, key: number }) {
    return (
        <div className={style.wrapper} key={key}>
            <span className={style.message}>
                {
                    data.type === 'user' ?
                        <UserMessage data={data} /> :
                        <SystemMessage data={data} />
                }
            </span>
        </div>
    );
}