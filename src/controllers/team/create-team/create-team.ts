import { Player, Team } from "../../../models/player";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreateTeamParams, ICreateTeamRepository } from "./protocols";

export class CreateTeamController implements IController {
  constructor(private readonly createTeamRepository: ICreateTeamRepository) { }
  async handle(httpRequest: HttpRequest<CreateTeamParams>): Promise<HttpResponse<Team | string>> {
    try {

      if (!httpRequest.body) {
        return badRequest("MISSING IS FIELD")
      }
      const team = await this.createTeamRepository.createTeam(httpRequest.body);

      return created<Team>(team);

    } catch (error) {

      return serverError();

    }
  }
}