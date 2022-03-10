import { DataTypes, Sequelize, Optional } from 'sequelize';
import AssociableModel from '../associable';
import { IPayment } from '../../types/payment';

class Payment extends AssociableModel<IPayment, Optional<IPayment, 'id' | 'transactionFee'>> implements IPayment {
    public id!: string;
    public buyerId: string;
    public amount: number;
    public transactionFee?: number;
}

export default (sequelize: Sequelize): typeof Payment => {
    Payment.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            buyerId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            transactionFee: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            modelName: 'payment',
            sequelize,
        }
    );

    Payment.associate = () => {};

    return Payment;
};
