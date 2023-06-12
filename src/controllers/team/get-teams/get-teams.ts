import { Team } from "../../../models/player";
import { ok, serverError } from "../../helpers";
import { IGetPlayersRepository } from "../../player/get-players/protocols";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IGetTeamsRepository } from "./protocols";

export class GetTeamsController implements IController {
  getTeamsRepository: IGetTeamsRepository;

  constructor(getTeamsRepository: IGetTeamsRepository) {
    this.getTeamsRepository = getTeamsRepository;
  }


  async handle(): Promise<HttpResponse<Team[] | string>> {
    try {
      const teams = await this.getTeamsRepository.getTeams();

      return ok<Team[]>(teams)
    } catch (error) {
      return serverError();
    }
  }

}
