import { Team } from "../../../models/player";

export interface IGetTeamsRepository {
  getTeams(): Promise<Team[]>
}