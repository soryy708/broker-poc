import { ResultBoundary } from '..';
import paymentEntityGateway from '../../entityGateway/payment';
import { IPayment } from '../../types/payment';

export class GetSuccess implements ResultBoundary {
    success = true;
    data: IPayment;
    constructor(data: IPayment) {
        this.data = data;
    }
}

type GetFailureReason = 'not found';

export class GetFailure implements ResultBoundary {
    success = false;
    reason: GetFailureReason;
    constructor(reason: GetFailureReason) {
        this.reason = reason;
    }
}

async function get(paymentId: string): Promise<GetSuccess | GetFailure> {
    const payment = await paymentEntityGateway.find(paymentId);
    if (!payment) {
        return new GetFailure('not found');
    }
    return new GetSuccess(payment);
}

export default get;
