import { Player } from "../../../models/player";
import { ok, serverError } from "../../helpers";
import { HttpResponse, IController } from "../../protocols";
import { IGetPlayersRepository } from "./protocols";

export class GetPlayersController implements IController {
  getPlayersRepository: IGetPlayersRepository;
  constructor(getPlayersRepository: IGetPlayersRepository) {
    this.getPlayersRepository = getPlayersRepository
  }
  async handle(): Promise<HttpResponse<Player[] | string>> {
    try {
      const players = await this.getPlayersRepository.getPlayers();

      return ok<Player[]>(players)
    } catch (error) {
      return serverError();
    }

  }
}