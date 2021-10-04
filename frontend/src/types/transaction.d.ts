import { Crypto } from "crypto";

export interface Transaction {
    merchant: string;
    item: string;
    amount: number;
    crypto: Crypto;
}