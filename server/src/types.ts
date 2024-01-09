import { MongoClient, Db } from 'mongodb';

export interface MongoDBInterface {
    name: string;
    client: MongoClient;
    db?: Db;
    connect(): Promise<void>;
}