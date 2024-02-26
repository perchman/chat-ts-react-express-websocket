import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Field, Form} from "react-final-form";

import ServiceLocator from "../../../frameworks/ServiceLocator/ServiceLocator";

import style from "./LoginForm.module.scss";

import {UserInterface} from "../../../types";

const generateRandomColor = () => {
    const letters: string = '0123456789ABCDEF';
    let color: string = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

const initialValues: UserInterface = {
    username: '',
    color: generateRandomColor()
}

export default function LoginForm() {
    const navigate: NavigateFunction = useNavigate();

    const onSubmit = (data: UserInterface): void => {
        const socket: WebSocket = new WebSocket("ws://localhost:8080");

        socket.onerror = (error): void => {
            console.error('WebSocket error:', error);
        };

        socket.onopen = (): void => {
            ServiceLocator.set<WebSocket>('Socket', socket);
            navigate(`/chat?username=${data.username}&color=${data.color.slice(1)}`);
        }
    }

    return (
        <>
            <h2 className={style.title}>Enter username and choose a color</h2>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({handleSubmit}) => {
                    return <form id="login-form" className={style.form} onSubmit={handleSubmit}>
                        <div className={style.inputs}>
                            <div className={style['username-item']}>
                                <Field
                                    name="username"
                                    className={style['username-input']}
                                    component="input"
                                    type="text"
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
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className={style['btn-item']}>
                            <button className={style.btn} type="submit">Join the chat</button>
                        </div>
                    </form>
                }}
            />
        </>
    );
}