import { CreateTeamParams, ICreateTeamRepository } from "../../../controllers/team/create-team/protocols";
import { MongoClient } from "../../../database/mongo";
import { Team } from "../../../models/player";
import { MongoTeam } from "../../mongo-protocols";

export class MongoCreateTeamRespository implements ICreateTeamRepository {
  async createTeam(params: CreateTeamParams): Promise<Team> {
    const { insertedId } = await MongoClient.db.collection('teams').insertOne(params)

    const team = await MongoClient.db.collection<MongoTeam>('teams').findOne({ _id: insertedId })

    console.log(team);
    if (!team) {
      throw new Error("User not created")
    }

    const { _id, ...rest } = team;

    return { id: _id.toHexString(), ...rest }

  }
}