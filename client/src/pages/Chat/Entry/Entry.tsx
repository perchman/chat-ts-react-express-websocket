import React, {useRef} from "react";
import {Form} from "react-final-form";
import { BiSolidSend } from "react-icons/bi";

import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import style from "./Entry.module.css";

interface User {
    username: string,
    color: string
}

export default function Entry({ user }: {user: User}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onSubmit = (data: {message: string}): void => {
        const socket: WebSocket = ServiceLocator.get<WebSocket>('Socket');
        socket.send(
            JSON.stringify(
                {
                    type: 'user',
                    date: new Date().getTime(),
                    user: user,
                    text: data.message
                }
            )
        );


        if (textareaRef.current) {
            textareaRef.current.value = '';
        }
    }

    return (
        <div className={style.entry}>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) => {
                    return <form id="entry-form" className={style.form} onSubmit={handleSubmit}>
                        <div>
                            <textarea
                                name="message"
                                className={style.message}
                                placeholder="Enter your message..."
                                ref={textareaRef}
                            />
                        </div>
                        <div className={style['entry-field']}>
                            <button className={style.btn} type="submit">
                                <BiSolidSend/>
                            </button>
                        </div>
                    </form>
                }}
            />
        </div>
    );
}