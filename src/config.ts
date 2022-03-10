const defaults = {
    defaultMarketplaceFee: 0.01,
    brokerFee: 0.003,
};

export default {
    get: (): typeof defaults => defaults,
};
