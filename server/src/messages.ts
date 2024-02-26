import {Db, Collection} from 'mongodb';
import {MongoDBInterface} from "./types";
import ServiceLocator from "./frameworks/ServiceLocator";

interface User {
    username: string,
    color: string
}

interface SystemMessage {
    type: "join" | "left",
    date: string,
    user: User
}

interface UserMassage {
    type: "user",
    date: string,
    user: User,
    text: string
}

const getDb = () => {
    const manager: MongoDBInterface = ServiceLocator.get<MongoDBInterface>('DefaultDB');

    if (!manager.db) {
        throw new Error('Database is not available');
    }

    return manager.db;
}

const saveMessage = async (message: SystemMessage | UserMassage): Promise<void> => {
    const db: Db = getDb();
    const collection: Collection = db.collection('Messages');
    await collection.insertOne(message);
}

const getMessages = async () => {
    const db: Db = getDb();
    const collection: Collection = db.collection('Messages');

    const totalDocuments: number = await collection.countDocuments();
    const skipAmount: number = Math.max(0, totalDocuments - 20);

    return await collection.find().sort({ date: 1 }).skip(skipAmount).toArray();
}

module.exports = {
    saveMessage,
    getMessages
}