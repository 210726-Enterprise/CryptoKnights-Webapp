<<<<<<< HEAD
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
=======
export interface Portfolio 
{
  id: number;
  porfolio_name: string;
  bitcoin: number;
  ethereum: number;
  dogecoin: number;
  usd: number;
  transactions: [];
  users: [];
}
>>>>>>> f814b9c42baa9d8dcc732750d2db945a2cdf8971
