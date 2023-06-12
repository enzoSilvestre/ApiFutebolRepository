import { Db } from "mongodb";
import { IAddPLayer, IAddPLayerRepository, ParamsAddPLayer } from "../../../controllers/team/add-player/protocols";
import { MongoClient } from "../../../database/mongo";
import { Player, Team } from "../../../models/player";
import { MongoTeam } from "../../mongo-protocols";

export class MongoAddPlayerRespository implements IAddPLayerRepository {
  async addPLayer(params: ParamsAddPLayer): Promise<IAddPLayer> {

    const playerId = params.idPlayer
    const teamId = params.idTeam

    const player = await MongoClient.db.collection<Player>('players').findOne({ id: playerId });

    if (!player) {
      throw new Error("player not exists")
    }
    const updatedTeam = await MongoClient.db.collection<Team>('teams').findOneAndUpdate(
      { id: teamId },
      { $push: { players: player } }
    )
    const team = await MongoClient.db.collection<Team>('teams').findOne({ id: teamId });

    if (!team) {
      throw new Error("The team is nullable");
    }

    return {
      id: team.id,
      creationDate: team.creationDate,
      name: team.name,
      players: team.players,
      valuation: team.valuation
    };

  }
}