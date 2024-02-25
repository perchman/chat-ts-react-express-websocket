import React from "react";

interface User {
    username: string,
    color: string
}

interface SystemMessage {
    type: "join" | "left",
    date: number,
    user: User
}

export default function SystemMessage({ data}: { data: SystemMessage }) {
    return (
        <div>
            <span style={{color: '#' + data.user.color}}>{data.user.username}</span>
            {
                data.type === "join" ?
                    ' join the chat' :
                    ' left the chat'
            }
        </div>
    );
}