import React from "react";
import {Link} from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

import style from "./Header.module.css";
import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

export default function Header() {

    const handleClick = () => {
        const socket: WebSocket = ServiceLocator.get<WebSocket>('Socket');
        socket.close();
        ServiceLocator.delete<WebSocket>('Socket');
    }

    return (
        <div className={style.header}>
            <Link to={'/'} className={style.btn} onClick={handleClick}>
                <FaArrowCircleLeft/>
                <span className={style['btn-text']}>Exit</span>
            </Link>
            <span className={style.username}>Nagibator339</span>
        </div>
    );
}