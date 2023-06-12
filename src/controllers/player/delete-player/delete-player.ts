import { ok, serverError } from "../../helpers";
import { Player } from "../../../models/player";
import { MongoDeletePlayerRepository } from "../../../repositories/player/delete-player/mongo-delete-player";
import { badRequest } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeletePlayerRepository } from "./protocols";

export class DeletePlayerController implements IController {
  constructor(private readonly deletePlayerRepository: IDeletePlayerRepository) { }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Player | string>> {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        return badRequest("Missing player id");
      }

      const player = await this.deletePlayerRepository.deletePlayer(id);
      return ok<Player>(player);

    } catch (error) {
      return serverError();
    }
  }

}