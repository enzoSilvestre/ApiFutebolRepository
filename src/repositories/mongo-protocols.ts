import { Player, Team } from "../models/player";

export type MongoUser = Omit<Player, "id">
export type MongoTeam = Omit<Team, "id">
