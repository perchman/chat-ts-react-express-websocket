import React from "react";
import {Link} from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

import style from "./Header.module.css";
import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

interface User {
    username: string,
    color: string
}

export default function Header({ user }: {user: User}) {

    const handleClick = () => {
        const socket: WebSocket = ServiceLocator.get<WebSocket>('Socket');

        socket.send(
            JSON.stringify(
                {
                    type: "left",
                    date: new Date().getTime(),
                    user: user
                }
            )
        );

        socket.close();
        ServiceLocator.delete<WebSocket>('Socket');
    }

    return (
        <div className={style.header}>
            <Link to={'/'} className={style.btn} onClick={handleClick}>
                <FaArrowCircleLeft/>
                <span className={style['btn-text']}>Exit</span>
            </Link>
            <span className={style.username} style={{color: '#' + user.color}}>{user.username}</span>
        </div>
    );
}