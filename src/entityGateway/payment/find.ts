import { Dependencies, injectDependencies } from '../../util/dependencyInjector';
import { IPayment } from '../../types/payment';

async function find(paymentId: string, dependencies: Dependencies = null): Promise<IPayment> {
    dependencies = injectDependencies(dependencies, ['db']);
    const createdPayment = await dependencies.db.models.payment.findByPk(paymentId);
    return createdPayment;
}

export default find;
