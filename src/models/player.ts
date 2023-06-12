export interface Player {
  id: string;
  firstName: string;
  gols: number;
  assists: number;
  wages: number;
}

export interface Team {
  id: string;
  creationDate: number;
  name: string;
  players: Player[]
  valuation: number;
}