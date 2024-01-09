import { MongoClient, Db } from 'mongodb';
import {MongoDBInterface} from "../types";

export default class MongoDB implements MongoDBInterface{
    name: string;
    client: MongoClient;
    db?: Db;

    constructor (name: string) {
        this.name = name;
        this.client = new MongoClient('mongodb://127.0.0.1:27017/');
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log(`Connection to ${this.name} installed`);
            this.db = this.client.db(this.name);
        } catch(err) {
            console.log(err);
        }
    }
}



