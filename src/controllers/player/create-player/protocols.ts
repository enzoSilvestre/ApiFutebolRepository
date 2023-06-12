import { Player } from "../../../models/player";

export interface CreatePlayerParams {
  firstName: string;
  gols: number;
  assists: number;
  wages: number;
}

export interface ICreatePlayerRepository {
  createPlayer(params: CreatePlayerParams): Promise<Player>
}