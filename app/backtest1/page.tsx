// import { Backtest, Strategy } from '@fugle/backtest';
import { TradeChart } from "#/ui/trade-chart";

async function onServer() {
  console.log('on server');
}

export default async function Page() {
  await onServer();
  return <div>
    Backtest 1
    <TradeChart />
    </div>
}