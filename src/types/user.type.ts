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
  "01. symbol": string
  "02. open": string
  "03. high": string
  "04. low": string
  "05. price": string
  "06. volume": string
  "07. latest trading day": string
  "08. previous close": string
  "09. change": string
  "10. change percent": string
  "11. shares": number
  "12. proportion": number
  "13. name": string
}

export type UserContextType = {
  user?: User;
  userPortfolio?: UserPortfolio;
  userPortfolioWeightings?: Weightings;
  saveUser: (user: User) => void;
  saveUserPortfolio: (userPortfolio: UserPortfolio) => void;
  saveUserPortfolioWeightings: (userPortfolioWeightings: Weightings) => void;
}