import React from "react";

import style from "./UserMassage.module.css";

interface User {
    username: string,
    color: string
}

interface UserMassage {
    type: "user",
    date: number,
    user: User,
    text: string
}

const months: { [key: number]: string } = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
};

export default function UserMessage({ data, key }: { data: UserMassage, key: number }) {
    const date: Date = new Date(data.date);

    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    return (
        <div className={style.message} style={{border: `2px solid #${data.user.color}`}} key={key}>
            <div className={style["username_top_right"]} style={{color: '#' + data.user.color}}>{data.user.username}</div>
            <div className={style.text}>{data.text}</div>
            <div className={style["date_bottom_left"]}>{`${hours}:${minutes} ${day} ${month} ${year}`}</div>
        </div>
    );
}