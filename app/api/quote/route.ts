export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const market = searchParams.get('market')?.trim() || '';
  const amount = searchParams.get('amount')?.trim() || '';
  const side = searchParams.get('side')?.trim() || '';

  if (!market || !amount || !side) {
    return Response.json(
      {
        error:
          'Missing required parameters: baseCurrency, quoteCurrency, or amount',
      },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({ market, from_amount: amount, side });
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE}/rfq/get_quote?${params.toString()}`
  );

  return fetch(url.toString())
    .then((response) => {
      if (!response.ok) {
        return Response.json(
          { error: `Failed to fetch markets: ${response.statusText}` },
          { status: 500 }
        );
      }

      return response.json();
    })
    .then((data) => Response.json(data))
    .catch((error) => Response.json({ error: error.message }, { status: 500 }));
}
