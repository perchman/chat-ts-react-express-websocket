import express from "express";
import http from "http";
import WebSocket from "ws";
import MongoDB from "./frameworks/MongoDB";
import ServiceLocator from "./frameworks/ServiceLocator";
import cors from "./middlewares/cors";

const messages = require('./messages');

const PORT = process.env.PORT || 5200;
const app = express();

app.use(cors);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const defaultDB: MongoDB = new MongoDB('Default');

async function start(): Promise<void> {
    try {
        await defaultDB.connect();
        ServiceLocator.set('DefaultDB', defaultDB);

        wss.on('connection', async (ws: WebSocket): Promise<void> => {
            console.log('Client connected');
            // ws.binaryType = 'arraybuffer';
            ws.send(JSON.stringify({ type:'history', messages: await messages.getMessages() }));

            ws.on('message', async (message: string): Promise<void> => {
                const data = JSON.parse(message);
                console.log(data);

                await messages.saveMessage(data);
            });

            ws.on('close', (): void => {
                console.log('Client disconnected');
            });

            ws.on('error', (error: Error): void => {
                console.error('WebSocket error:', error);
            });
        });

        server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();


// wss.clients.forEach((client: WebSocket): void => {
//     if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(message));
//     }
// });