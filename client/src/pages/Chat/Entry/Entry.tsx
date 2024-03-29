import React from "react";
import {Field, Form} from "react-final-form";
import { BiSolidSend } from "react-icons/bi";

import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import style from "./Entry.module.scss";

import {UserInterface} from "../../../types";

export default function Entry({ user }: { user: UserInterface }) {
    const onSubmit = async (data: { message: string }, form: any): Promise<void> => {
        const socket: WebSocket = ServiceLocator.get<WebSocket>('Socket');

        socket.send(
            JSON.stringify({
                type: 'user',
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
                    <form id="entry-form" className={style['entry-form']} onSubmit={handleSubmit}>
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