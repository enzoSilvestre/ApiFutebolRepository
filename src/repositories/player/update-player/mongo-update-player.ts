import { ObjectId } from "mongodb";
import { IUpdatePlayerRepository, UpdatePlayerParams } from "../../../controllers/player/update-player/update-player";
import { MongoClient } from "../../../database/mongo";
import { Player } from "../../../models/player"
import { MongoUser } from "../../mongo-protocols";

export class MongoUpdatePlayerRepository implements IUpdatePlayerRepository {
  async updatePlayer(id: string, params: UpdatePlayerParams): Promise<Player> {
    await MongoClient.db.collection("players").updateOne({ _id: new ObjectId(id) }, {
      $set: {
        ...params
      }
    })

    const player = await MongoClient.db.collection<MongoUser>("players").findOne({ _id: new ObjectId(id) })

    if (!player) {
      throw new Error('player not updated')
    }

    const { _id, ...rest } = player;

    return { id: _id.toHexString(), ...rest }
  }
}