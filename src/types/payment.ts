export interface IPayment {
    id: string;
    buyerId: string;
    amount: number;
    transactionFee?: number;
}
