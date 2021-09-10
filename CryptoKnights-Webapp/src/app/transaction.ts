import { Portfolio } from "./portfolio";

export interface Transaction {
    transactionId: number;
    portfolio: Portfolio;
    transactionDateTime: Date;
    transactionInCurrency: number;
    transactionInAmount: number;
    transactionOutCurrency: number;
    transactionOutAmount: number;
}