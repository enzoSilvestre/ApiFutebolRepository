import { IGetPlayersRepository } from "../../../controllers/player/get-players/protocols";
import { IGetTeamsRepository } from "../../../controllers/team/get-teams/protocols";
import { MongoClient } from "../../../database/mongo";
import { Player, Team } from "../../../models/player";
import { MongoTeam, MongoUser } from "../../mongo-protocols";

export class MongoGetTeamsRepository implements IGetTeamsRepository {
  async getTeams(): Promise<Team[]> {
    const teams = await MongoClient.db.collection<MongoTeam>('teams').find({}).toArray();

    return teams.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }))
  }

}