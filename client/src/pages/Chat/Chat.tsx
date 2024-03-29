import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

import ServiceLocator from "../../frameworks/ServiceLocator/ServiceLocator";

import Header from "./Header/Header";
import Messages from "./Messages/Messages";
import Entry from "./Entry/Entry";

import style from "./Chat.module.scss";

import {UserInterface} from "../../types";

export default function Chat() {
    const { search } : { search: string } = useLocation();
    const searchParams: URLSearchParams = new URLSearchParams(search);
    const user: UserInterface = {
        username: searchParams.get('username') || '',
        color: searchParams.get('color') || ''
    };

    useEffect((): void => {
        const socket: WebSocket = ServiceLocator.get<WebSocket>('Socket');

        socket.send(
            JSON.stringify(
                {
                    type: "join",
                    user: user
                }
            )
        );
    }, [search]);

    return (
        <div className={style.main}>
            <Header user={user}/>
            <Messages user={user}/>
            <Entry user={user}/>
        </div>
    );
}