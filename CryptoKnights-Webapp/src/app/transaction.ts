export interface Transaction {
    transactionId: number;
    portfolio: number;
    transactionDateTime: Date;
    transactionInCurrency: number;
    transactionInAmount: number;
    transactionOutCurrency: number;
    transactionOutAmount: number;
}