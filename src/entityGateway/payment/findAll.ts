import { Dependencies, injectDependencies } from '../../util/dependencyInjector';
import { IPayment } from '../../types/payment';

async function findAll(dependencies: Dependencies = null): Promise<IPayment[]> {
    dependencies = injectDependencies(dependencies, ['db']);
    const payments = await dependencies.db.models.payment.findAll();
    return payments;
}

export default findAll;
