import React, {useEffect, useState} from "react";
import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

interface User {
    username: string,
    color: string
}

interface SystemMessage {
    type: "join" | "left",
    date: string,
    user: User
}

interface UserMassage {
    type: "user",
    date: string,
    user: User,
    text: string
}

interface Messages {
    messages: SystemMessage[] | UserMassage[],
    user: User
}

export default function Messages({ user }: {user: User}) {
    const [messages, setMessages] = useState<SystemMessage[] | UserMassage[]>([]);

    useEffect((): void => {
        const socket: WebSocket = ServiceLocator.get<WebSocket>('Socket');

        socket.onmessage = (e: MessageEvent): void => {
            const data = JSON.parse(e.data);

            if (data.type === 'history') {
                setMessages(data.messages)
            } else {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        }
    }, [user]);

    return (
        <div>{
            messages.map((message, index) => {
                return <div key={index}>message</div>
            } )
        }</div>
    );
}