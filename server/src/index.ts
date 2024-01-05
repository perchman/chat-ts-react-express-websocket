import express from "express";
import http from "http";
import WebSocket from "ws";

import cors from "./middlewares/cors";
import router from "./route";

const PORT = process.env.PORT || 5200;
const app = express();

app.use(cors);
app.use(router);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

async function start() {
    try {
        wss.on('connection', (ws) => {
            console.log('Client connected');

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });

        server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();