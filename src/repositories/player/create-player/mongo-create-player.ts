import { CreatePlayerParams, ICreatePlayerRepository } from "../../../controllers/player/create-player/protocols";
import { MongoClient } from "../../../database/mongo";
import { Player } from "../../../models/player";
import { MongoUser } from "../../mongo-protocols";

export class MongoCreatePlayerRepository implements ICreatePlayerRepository {
  async createPlayer(params: CreatePlayerParams): Promise<Player> {
    const { insertedId } = await MongoClient.db.collection('players').insertOne(params)

    const player = await MongoClient.db.collection<MongoUser>('players').findOne({ _id: insertedId });

    if (!player) {
      throw new Error("User not created")
    }
    const { _id, ...rest } = player;

    return { id: _id.toHexString(), ...rest }
  }

}