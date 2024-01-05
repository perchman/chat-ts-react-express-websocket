import React, {useState} from "react";
import {Field, Form} from "react-final-form";
import { BiSolidSend } from "react-icons/bi";

import style from "./Entry.module.css";

export default function Entry() {
    const [message, setMessage] = useState<string | undefined>('');

    const onSubmit = (text: string) => {
        console.log(text);
    }

    return (
        <div className={style.entry}>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) => {
                    return <form id="entry-form" className={style.form} onSubmit={handleSubmit}>
                        <div>
                            <Field
                                name="message"
                                className={style.message}
                                component="textarea"
                                type="text"
                                placeholder="Enter your message..."
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