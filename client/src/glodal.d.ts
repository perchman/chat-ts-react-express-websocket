declare module '*.module.css' {
    const style: { [className: string]: string };
    export = style;
}

declare module '*.scss' {
    const style: { [key: string]: string };
    export default style;
}