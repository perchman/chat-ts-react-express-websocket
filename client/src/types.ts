export interface UserInterface {
    username: string,
    color: string
}

export interface SystemMessageInterface {
    type: "join" | "left",
    date: number,
    user: UserInterface
}

export interface UserMassageInterface {
    type: "user",
    date: number,
    user: UserInterface,
    text: string
}