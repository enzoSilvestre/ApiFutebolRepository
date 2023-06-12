import express from 'express'
import { config } from 'dotenv'
import { MongoGetPlayersRepository } from './repositories/player/get-players/mongo-get-players';
import { GetPlayersController } from './controllers/player/get-players/get-players';
import { MongoClient } from "./database/mongo";
import { MongoCreatePlayerRepository } from './repositories/player/create-player/mongo-create-player';
import { CreatePlayerController } from './controllers/player/create-player/create-player';
import { MongoUpdatePlayerRepository } from './repositories/player/update-player/mongo-update-player';
import { UpdatePlayerController } from './controllers/player/update-player/update-player';
import { MongoDeletePlayerRepository } from './repositories/player/delete-player/mongo-delete-player';
import { DeletePlayerController } from './controllers/player/delete-player/delete-player';
import { MongoCreateTeamRespository } from './repositories/team/create-team/mongo-create-team';
import { CreateTeamController } from './controllers/team/create-team/create-team';
import { MongoGetTeamsRepository } from './repositories/team/get-team/mongo-get-players'; 
import { GetTeamsController } from './controllers/team/get-teams/get-teams'; 
import { MongoAddPlayerRespository } from './repositories/team/add-player/mongo-add-player';
import { AddPlayerController } from './controllers/team/add-player/add-player';


const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/players", async (req, res) => {
    const mongoGetPlayersRepository = new MongoGetPlayersRepository();
    const getPlayersController = new GetPlayersController(mongoGetPlayersRepository)
    const { body, statusCode } = await getPlayersController.handle();
    res.status(statusCode).send(body);
  })
  app.get("/teams", async (req, res) => {
    const mongoGetTeamsRepository = new MongoGetTeamsRepository();
    const getTeamsController = new GetTeamsController(mongoGetTeamsRepository)
    const { body, statusCode } = await getTeamsController.handle();
    res.status(statusCode).send(body);
  })

  app.put('/teams/:id/players/:playerId', async (req, res) => {
    const mongoAddPlayerRespository = new MongoAddPlayerRespository();
    const addPLayersController = new AddPlayerController(mongoAddPlayerRespository)
    const { body, statusCode } = await addPLayersController.handle({
      params: req.params
    })

    res.status(statusCode).send(body)

  })
  
  app.post('/players', async (req, res) => {
    const mongoCreatePlayerRepository = new MongoCreatePlayerRepository()

    const createPlayerController = new CreatePlayerController(mongoCreatePlayerRepository)

    const { body, statusCode } = await createPlayerController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  })
  app.post('/teams', async (req, res) => {
    const mongoCreateTeamRepository = new MongoCreateTeamRespository()

    const createTeamController = new CreateTeamController(mongoCreateTeamRepository)

    const { body, statusCode } = await createTeamController.handle({
      body: req.body,
    })

    res.status(statusCode).send(body);
  })

  app.patch('/players/:id', async (req, res) => {
    const mongoUpdatePlayerRepository = new MongoUpdatePlayerRepository();
    const updatePlayerController = new UpdatePlayerController(mongoUpdatePlayerRepository);

    const { body, statusCode } = await updatePlayerController.handle({
      body: req.body,
      params: req.params
    })
    res.status(statusCode).send(body)
  })
  app.delete('/players/:id', async (req, res) => {
    const mongoDeletePlayerRepository = new MongoDeletePlayerRepository();
    const deletePlayerController = new DeletePlayerController(mongoDeletePlayerRepository);

    const { body, statusCode } = await deletePlayerController.handle({
      params: req.params
    })
    res.status(statusCode).send(body)
  })


  const port = process.env.PORT || 3000

  app.listen(port, () => console.log(`listening on port ${port}`))
}

main();
