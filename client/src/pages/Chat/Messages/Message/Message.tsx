import React from "react";

import UserMessage from "./UserMessage/UserMessage";
import SystemMessage from "./SystemMessage/SystemMessage";

import style from './Message.module.scss';

import {SystemMessageInterface, UserMassageInterface} from "../../../../types";

export default function Message({ data}: { data: SystemMessageInterface | UserMassageInterface}) {
    return (
        <div className={style.wrapper}>
            <span className={style.message}>
                {
                    data.type === 'user' ?
                        <UserMessage data={data} /> :
                        <SystemMessage data={data} />
                }
            </span>
        </div>
    );
}