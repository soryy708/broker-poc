// https://medium.com/infocentric/setup-a-rest-api-with-sequelize-and-express-js-fae06d08c0a7

import { Sequelize, Dialect, Options } from 'sequelize';
import pg from 'pg';
import models from './model';

export type Context = {
    sequelize: Sequelize;
    models: {
        [key in keyof Partial<typeof models>]: ReturnType<typeof models[key]>;
    };
};

const globalContext: Context = {
    sequelize: null,
    models: {},
};

export async function init(context = globalContext): Promise<void> {
    const dbConfig: Options = {
        dialect: 'postgres' as Dialect,
        host: 'localhost',
        port: 5432,
        database: 'database',
        username: 'postgres',
        password: 'password',
        dialectModule: pg,
        logging: sql => console.log(sql),
        define: {
            freezeTableName: true,
        },
    };

    context.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

    Object.entries(models).forEach(([modelName, modelDef]) => {
        const model = modelDef(context.sequelize);
        context.models[modelName as keyof typeof models] = model as any;
    });
    Object.values(context.models).forEach(model => {
        model.associate(context.models);
    });

    await context.sequelize.authenticate();
    if (process.env.NODE_ENV !== 'production') {
        await context.sequelize.sync();
    }
}

export async function teardown(context: Context): Promise<void> {
    await context.sequelize.close();
}

export default globalContext;
