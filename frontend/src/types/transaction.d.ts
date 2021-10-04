export interface Transaction {
    id: number;
    merchant: string;
    item: string;
    amount: number;
    cryptoName: string;
}