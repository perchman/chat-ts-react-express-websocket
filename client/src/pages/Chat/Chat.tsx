import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import ServiceLocator from "../../frameworks/ServiceLocator/ServiceLocator";

import Header from "./Header/Header";
import Messages from "./Messages/Messages";
import Entry from "./Entry/Entry";

import style from "./Chat.module.css";

interface Params {
    username: string,
    color: string
}

// const socket: WebSocket = new WebSocket("ws://localhost:5200");

// socket.onmessage = (message): void => {
//
// };

export default function Chat() {
    const { search } : { search: string } = useLocation();
    const [params, setParams] = useState<Params>();
    console.log(ServiceLocator.get('Socket'));

    useEffect(() => {
        const searchParams: URLSearchParams = new URLSearchParams(search);

        // socket.onopen = (): void => {
        //     console.log('Connect to server');
        //
        //     socket.send(JSON.stringify(params));
        // }
    }, [search]);

    return (
        <div className={style.main}>
            <Header/>
            <Messages/>
            <Entry/>
        </div>
    );
}