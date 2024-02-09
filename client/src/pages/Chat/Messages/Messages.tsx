import React, {useEffect, useLayoutEffect, useState, useRef} from "react";
import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import UserMessage from "./UserMessage/UserMessage";
import SystemMessage from "./SystemMessage/SystemMessage";

import style from "./Messages.module.css";

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

    const scrollRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            scrollRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [messages]);

    return (
        <div className={style.messages} ref={scrollRef}>
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