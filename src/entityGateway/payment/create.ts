import { Dependencies, injectDependencies } from '../../util/dependencyInjector';

async function create(
    paymentData: { buyerId: string; amount: number; transactionFee: number },
    dependencies: Dependencies = null
): Promise<string> {
    dependencies = injectDependencies(dependencies, ['db']);
    const { buyerId, amount, transactionFee } = paymentData;
    const createdPayment = await dependencies.db.models.payment.create({
        buyerId,
        amount,
        transactionFee,
    });
    return createdPayment.id;
}

export default create;
