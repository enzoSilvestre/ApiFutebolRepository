import { Player } from "../../../models/player";
export interface IGetPlayersRepository {
  getPlayers(): Promise<Player[]>
}