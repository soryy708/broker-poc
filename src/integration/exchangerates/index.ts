// https://exchangeratesapi.io/documentation/
import axios from 'axios';

class ExchangeRatesApiError extends Error {
    constructor(error: string) {
        super(error);
    }
}

async function getLatestRates(symbol: string): Promise<number> {
    const apiKey = process.env.EXCHANGE_RATES_API_KEY;
    const base = 'EUR'; // Default. Looks like USD is restricted, resulting in failure
    const response = await axios
        .get(
            `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&base=${base}&symbols=${[symbol, 'USD'].join(
                ','
            )}`
        )
        .catch(err => {
            if (!err.response) {
                throw err;
            }
            throw new ExchangeRatesApiError(err.response.data.error.message);
        });
    const rates: Record<string, number> = response.data.rates;
    const symbolCostInEuro = rates[symbol];
    const usdCostInEuro = rates.USD;
    const usdToSymbolRate = symbolCostInEuro / usdCostInEuro;
    return usdToSymbolRate;
}

export default {
    getLatestRates,
};
