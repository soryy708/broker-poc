import { ResultBoundary } from '..';
import paymentEntityGateway from '../../entityGateway/payment';

export class AcceptSuccess implements ResultBoundary {
    success = true;
    data: string;
    constructor(data: string) {
        this.data = data;
    }
}

async function accept(buyerId: string, amount: number, transactionFee = 0.01): Promise<AcceptSuccess> {
    const paymentId = await paymentEntityGateway.create({ buyerId, amount, transactionFee });
    return new AcceptSuccess(paymentId);
}

export default accept;
