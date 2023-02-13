import { Holdings } from "../components/Portfolio"

export interface User {
  kind: string
  localId: string
  email: string,
  displayName: string
  idToken: string
  registered: boolean
  refreshToken: string
  expiresIn: string
}

export interface UserPortfolio {
  user: string,
  email: string,
  localId: string,
  portfolio: Holdings[]
}

export interface Stock {
  ticker: string
  shortName: string
}

export interface Weightings {
  weightings: Weighting[]
}

export interface Weighting {
  c: number
  h: number
  l: number
  o: number
  pc: number
  t: number
  symbol: string
  shares: number
  proportion: number
  name: string
}

export type UserContextType = {
  user?: User;
  userPortfolio?: UserPortfolio;
  userPortfolioWeightings?: Weightings;
  saveUser: (user: User) => void;
  saveUserPortfolio: (userPortfolio: UserPortfolio) => void;
  saveUserPortfolioWeightings: (userPortfolioWeightings: Weightings) => void;
}