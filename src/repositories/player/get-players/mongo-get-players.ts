import { IGetPlayersRepository } from "../../../controllers/player/get-players/protocols";
import { MongoClient } from "../../../database/mongo";
import { Player } from "../../../models/player";
import { MongoUser } from "../../mongo-protocols";

export class MongoGetPlayersRepository implements IGetPlayersRepository {
  async getPlayers(): Promise<Player[]> {
    const players = await MongoClient.db.collection<MongoUser>('players').find({}).toArray();

    return players.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }))
  }

}