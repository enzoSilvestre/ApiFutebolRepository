import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IAddPLayer, IAddPLayerRepository, ParamsAddPLayer } from "./protocols";

export class AddPlayerController implements IController {
  constructor(private readonly addPlayerRepository: IAddPLayerRepository) { }
  async handle(httpRequest: HttpRequest<ParamsAddPLayer>): Promise<HttpResponse<IAddPLayer | string>> {
    try {

      const newPlayer = await this.addPlayerRepository.addPLayer(httpRequest.params);

      return created<IAddPLayer>(newPlayer);

    } catch (error) {
      return serverError();
    }
  }

}