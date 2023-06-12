import { Player } from "../../../models/player";

export interface UpdatePlayerParams {
  firstName?: string;
  gols?: number;
  wages?: number;
}

export interface IUpdatePlayerRepository {
  updatePlayer(id: string, params: UpdatePlayerParams): Promise<Player>;
}