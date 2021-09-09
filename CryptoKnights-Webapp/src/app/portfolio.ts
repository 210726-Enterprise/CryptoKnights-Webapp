import { Transaction } from "./transaction";

export interface Portfolio {
    portfolioId: number;
    portfolioName: string;
    bitcoin: number;
    ethereum: number;
    dogecoin: number;
    usd: number;
    transaction: Transaction[];
    users: number[];
  }