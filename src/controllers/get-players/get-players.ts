import { IGetPlayersController, IGetPlayersRepository } from "./protocols";

export class GetPlayersController implements IGetPlayersController {
  getPlayersRepository: IGetPlayersRepository;
  constructor(getPlayersRepository: IGetPlayersRepository) {
    this.getPlayersRepository = getPlayersRepository
  }
  async handle() {
    try {
      const players = await this.getPlayersRepository.getPlayers();

      return {
        statusCode: 200,
        body: players,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: "deu chabu"
      }
    }

  }
}