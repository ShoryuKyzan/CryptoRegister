import { Crypto } from "crypto";

export interface Transaction {
    merchant: string;
    item: string;
    amount: string;
    crypto: Crypto;
}