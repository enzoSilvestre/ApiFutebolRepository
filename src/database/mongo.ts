import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "mongodb+srv://cluster0.xgypou5.mongodb.net";
    const username = "root";
    const password = "123";

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("players");

    this.client = client;
    this.db = db;


    console.log("connected to mongodb!");

  },
};