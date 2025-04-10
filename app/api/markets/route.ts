import { getMarkets } from '@/lib/services/market-service';

export const dynamic = 'force-static';
export const revalidate = 60;

export async function GET() {
  return getMarkets().then((result) => {
    if (!result.success) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    return Response.json(result.data);
  });
}
