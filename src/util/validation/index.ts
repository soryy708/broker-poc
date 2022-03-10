function exists(o: unknown): boolean {
    return o !== undefined && o !== null;
}

function isString(o: unknown): boolean {
    return (exists(o) && typeof o === 'string') || o instanceof String;
}

function isNumber(o: unknown): boolean {
    return exists(o) && (typeof o === 'number' || o instanceof Number) && !isNaN(o as number);
}

function isUuid(o: unknown): boolean {
    return (
        isString(o) && /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/iu.test(o as string)
    );
}

export default {
    exists,
    isString,
    isNumber,
    isUuid,
};
