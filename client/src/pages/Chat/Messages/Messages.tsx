import React, {useEffect, useLayoutEffect, useState, useRef} from "react";
import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import Message from "./Message/Message";

import style from "./Messages.module.scss";

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
                    return <Message data={message} key={index} />;
                })
            }
        </div>
    );
}