import { Player } from "../../../models/player";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreatePlayerParams, ICreatePlayerRepository } from "./protocols";

export class CreatePlayerController implements IController {
  constructor(private readonly createPlayerRepository: ICreatePlayerRepository) { }
  async handle(httpRequest: HttpRequest<CreatePlayerParams>): Promise<HttpResponse<Player | string>> {
    try {

      /* A validation of the fields. */

      // const requiredFields = ["firstName", "gols", "assists", "wages"]

      // for (const field of requiredFields) {
      //   if (!httpRequest?.body?.[field as keyof CreatePlayerParams]?.length) {
      //     return {
      //       statusCode: 400,
      //       body: `Campo ${field} é requerido`,
      //     }
      //   }
      // }

      if (!httpRequest.body) {
        return badRequest("MISSING IS FIELD")
      }
      const player = await this.createPlayerRepository.createPlayer(httpRequest.body);

      return created<Player>(player)
    } catch (error) {
      return serverError();
    }
  }
}