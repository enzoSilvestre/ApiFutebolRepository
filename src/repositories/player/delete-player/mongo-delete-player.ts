import { ObjectId } from "mongodb";
import { IDeletePlayerRepository } from "../../../controllers/player/delete-player/protocols"
import { MongoClient } from "../../../database/mongo";
import { Player } from "../../../models/player"
import { MongoUser } from "../../mongo-protocols";

export class MongoDeletePlayerRepository implements IDeletePlayerRepository {
  async deletePlayer(id: string): Promise<Player> {
    const player = await MongoClient.db.collection<MongoUser>("players").findOne({ _id: new ObjectId(id) })

    if (!player) {
      throw new Error("player not found")
    }

    const { deletedCount } = await MongoClient.db.collection("players").deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) throw new Error("User not deleted")

    const { _id, ...rest } = player;

    return { id: _id.toHexString(), ...rest }
  }
}