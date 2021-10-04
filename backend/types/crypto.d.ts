export interface Crypto {
    name: string;
    price: number;
    updated: number;
}

export interface CryptoDict {
    [name: string]: Crypto
}