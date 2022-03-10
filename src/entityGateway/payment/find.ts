import { Dependencies, injectDependencies } from '../../util/dependencyInjector';
import { IPayment } from '../../types/payment';

async function find(paymentId: string, dependencies: Dependencies = null): Promise<IPayment> {
    dependencies = injectDependencies(dependencies, ['db']);
    const payment = await dependencies.db.models.payment.findByPk(paymentId);
    return payment;
}

export default find;
