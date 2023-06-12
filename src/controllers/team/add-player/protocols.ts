import { Player, Team } from "../../../models/player";

export interface IAddPLayer {
  id: string;
  creationDate: number;
  name: string;
  players: Player[]
  valuation: number;
}

export interface ParamsAddPLayer {
  idTeam: string;
  idPlayer: string;
}

export interface IAddPLayerRepository {
  addPLayer(params: ParamsAddPLayer): Promise<IAddPLayer>
}