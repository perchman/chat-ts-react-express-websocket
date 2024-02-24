import React, {useRef} from "react";
import {Field, Form} from "react-final-form";
import { BiSolidSend } from "react-icons/bi";

import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import style from "./Entry.module.scss";

interface User {
    username: string,
    color: string
}

export default function Entry({ user }: { user: User }) {
    const onSubmit = async (data: { message: string }, form: any): Promise<void> => {
        const socket: WebSocket = ServiceLocator.get<WebSocket>('Socket');
        console.log(data);
        socket.send(
            JSON.stringify({
                type: 'user',
                date: new Date().getTime(),
                user: user,
                text: data.message,
            })
        );

        form.reset();
    };

    return (
        <div className={style.entry}>
            <Form
                onSubmit={onSubmit}
                initialValues={{ message: '' }}
                render={({ handleSubmit }) => (
                    <form id="entry-form" className={style.form} onSubmit={handleSubmit}>
                        <Field
                            name="message"
                            render={({ input }) => (
                                <div>
                                    <textarea
                                        className={style.message}
                                        placeholder="Enter your message..."
                                        {...input}
                                    />
                                </div>
                            )}
                        />
                        <div className={style['entry-field']}>
                            <button className={style.btn} type="submit">
                                <BiSolidSend />
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    );
}