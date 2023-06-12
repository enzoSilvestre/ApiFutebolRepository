import { Player, Team } from "../../../models/player";

export interface CreateTeamParams {
  creationDate: string;
  name: string;
  players: Player[]
  valuation: number;
}

export interface ICreateTeamRepository {
  createTeam(params: CreateTeamParams): Promise<Team>
}