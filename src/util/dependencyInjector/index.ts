import db from '../../db';

export type Dependencies = Partial<{ db: typeof db }>;

const globalDefaultDependencies: Dependencies = { db };

export function injectDependencies(
    dependencies: Dependencies,
    requestedDependencies: Array<keyof Dependencies>,
    defaultDependencies = globalDefaultDependencies
): Dependencies {
    if (!dependencies) {
        dependencies = {};
    }

    requestedDependencies.forEach(requestedDependency => {
        if (!dependencies[requestedDependency]) {
            (dependencies[requestedDependency] as any) = defaultDependencies[requestedDependency];
        }
    });

    return dependencies;
}

export default {
    injectDependencies,
};
