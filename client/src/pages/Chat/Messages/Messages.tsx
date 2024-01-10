import React, {useEffect, useState} from "react";
import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import UserMessage from "./UserMessage/UserMessage";
import SystemMessage from "./SystemMessage/SystemMessage";

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

interface Messages {
    messages: SystemMessageInterface[] | UserMassageInterface[],
    user: User
}

export default function Messages({ user }: {user: User}) {
    const [
        messages,
        setMessages
    ] = useState<SystemMessageInterface[] | UserMassageInterface[]>([]);

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
        <div>
            {
                messages.map((message, index) => {
                    return message.type === 'user' ?
                        <UserMessage data={message} key={index}/> :
                        <SystemMessage data={message} key={index}/>
                })
            }
        </div>
    );
}