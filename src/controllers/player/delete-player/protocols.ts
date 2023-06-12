import { Player } from "../../../models/player";

export interface IDeletePlayerRepository {
  deletePlayer(id: string): Promise<Player>;
}