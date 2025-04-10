export const dynamic = 'force-static';
export const revalidate = 60;

export async function GET() {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}/markets`)
    .then((response) => {
      if (!response.ok) {
        return Response.json(
          { error: `Failed to fetch markets: ${response.statusText}` },
          { status: 500 }
        );
      }

      return response.json();
    })
    .then((data) => {
      const uniqueBaseCurrencies: { label: string; value: string }[] =
        Array.from(
          new Map<string, { label: string; value: string }>(
            data.map((market: any) => [
              market.base_currency as string,
              {
                label: market.base_currency_long as string,
                value: market.base_currency as string,
              },
            ])
          ).values()
        );

      const processedData = {
        baseMarkets: uniqueBaseCurrencies,
        allMarkets: data.map((market: any) => ({
          baseCurrency: market.base_currency,
          baseCurrencyName: market.base_currency_long,
          baseCurrencyPrecision: market.base_precision,
          quoteCurrency: market.quote_currency,
          quoteCurrencyName: market.quote_currency_long,
          quoteCurrencyPrecision: market.quote_precision,
        })),
      };

      return Response.json(processedData);
    })
    .catch((error) => Response.json({ error: error.message }, { status: 500 }));
}
