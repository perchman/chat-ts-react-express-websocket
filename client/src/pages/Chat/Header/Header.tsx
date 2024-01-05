import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

import style from "./Header.module.css";

export default function Header() {
    return (
        <div className={style.header}>
            <button className={style.btn}>
                <FaArrowCircleLeft/>
                <span className={style['btn-text']}>Exit</span>
            </button>
            <span className={style.username}>Nagibator339</span>
        </div>
    );
}