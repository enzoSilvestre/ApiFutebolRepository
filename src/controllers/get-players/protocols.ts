import { Player } from "../../models/player";
import { HttpResponse } from "../protocols";

export interface IGetPlayersController {
  handle(): Promise<HttpResponse<Player[]>>;
}

export interface IGetPlayersRepository {
  getPlayers(): Promise<Player[]>
}