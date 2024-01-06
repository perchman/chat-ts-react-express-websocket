import React, {useState} from "react";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {Field, Form} from "react-final-form";

import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import style from "./LoginForm.module.css";

const generateRandomColor = () => {
    const letters: string = '0123456789ABCDEF';
    let color: string = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

interface UserData {
    username: string,
    color: string
}

const initialValues: UserData = {
    username: '',
    color: generateRandomColor()
}

export default function LoginForm() {
    const [values, setValues] = useState<UserData>(initialValues);

    const handleChange = ({ target: {value, name} }: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({...values, [name]: value});
    }

    const navigate: NavigateFunction = useNavigate();

    const onSubmit = (data: UserData): void => {
        ServiceLocator.set<WebSocket>('Socket', new WebSocket("ws://localhost:5200"));

        navigate(`/chat?username=${data.username}&color=${data.color}`);
    }

    return (
        <>
            <h2 className={style.title}>Enter username and choose a color</h2>
            <Form
                onSubmit={onSubmit}
                initialValues={values}
                render={({handleSubmit}) => {
                    return <form id="login-form" className={style.form} onSubmit={handleSubmit}>
                        <div className={style.inputs}>
                            <div className={style['username-item']}>
                                <Field
                                    name="username"
                                    className={style['username-input']}
                                    component="input"
                                    type="text"
                                    // onChange={handleChange}
                                    placeholder="Username"
                                />
                            </div>
                            <div className={style['color-item']}>
                                <Field
                                    name="color"
                                    render={({ input }) => (
                                        <input
                                            className={style['color-input']}
                                            type="color" {...input}
                                            // onChange={handleChange}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        {/*<Link*/}
                        {/*    to={`/chat?username=${values.username}&color=${values.color}`}*/}
                        {/*    className={style['btn-item']}*/}
                        {/*>*/}
                        {/*        <button className={style.btn} type="submit">Join the chat</button>*/}
                        {/*</Link>*/}

                        <button className={style.btn} type="submit">Join the chat</button>
                    </form>
                }}
            />
        </>
    );
}