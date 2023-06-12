import { IUpdatePlayerRepository, UpdatePlayerParams } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { Player } from "../../../models/player"
import { badRequest, ok, serverError } from "../../helpers";

export class UpdatePlayerController implements IController {
  constructor(private readonly updatePlayerRepository: IUpdatePlayerRepository) { }
  async handle(httpRequest: HttpRequest<UpdatePlayerParams>): Promise<HttpResponse<Player | string>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest.body;

      if (!body) {
        return badRequest("Body missing fields")
      }

      if (!id) {
        return badRequest("missing id")
      }
      // keyof é para tipar a chave de um objeto
      const allowedFieldsToUpdate: (keyof UpdatePlayerParams)[] = ["firstName", "gols", "wages"]
      const someFieldIsNoteAllowedToUpdate = Object.keys(body).some((key) => !allowedFieldsToUpdate.includes(key as keyof UpdatePlayerParams));

      if (someFieldIsNoteAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const player = await this.updatePlayerRepository.updatePlayer(id, body)

      return ok<Player>(player)

    } catch (error) {
      return serverError();
    }
  }
}

export { IUpdatePlayerRepository, UpdatePlayerParams };
