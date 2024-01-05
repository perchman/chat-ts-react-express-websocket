import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import Header from "./Header/Header";
import Messages from "./Messages/Messages";
import Entry from "./Entry/Entry";

import style from "./Chat.module.css";

interface Params {
    username: string,
    color: string
}

const socket: WebSocket = new WebSocket("ws://localhost:5200");

export default function Chat() {
    const { search } : { search: string } = useLocation();
    const [params, setParams] = useState<Params>();


    useEffect(() => {
        const searchParams = new URLSearchParams(search);


        // socket.onopen = (event) => {
        //
        // }
    }, []);

    return (
        <div className={style.main}>
            <Header/>
            <Messages/>
            <Entry/>
        </div>
    );
}