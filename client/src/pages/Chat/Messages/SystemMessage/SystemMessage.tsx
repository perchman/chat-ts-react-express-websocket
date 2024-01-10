import React from "react";

import style from "./SystemMessage.module.css";

interface User {
    username: string,
    color: string
}

interface SystemMessage {
    type: "join" | "left",
    date: number,
    user: User
}

export default function SystemMessage({data, key}: {data: SystemMessage, key: number}) {
    return (
        <div className={style.message} key={key}>
            <div className={style.text}>
                <span className={style.username} style={{color: '#' + data.user.color}}>{data.user.username}</span>
                {
                    data.type === "join" ?
                        ' join the chat' :
                        ' left the chat'
                }
            </div>
        </div>
    );
}