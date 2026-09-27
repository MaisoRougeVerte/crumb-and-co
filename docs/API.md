# Crumb & Co API

Written by the team in August, before the inventory and promo changes.

## Orders

Create the shop with `createBakery(options)`. It returns `placeOrder` and `stockOf`.
Stock reservation lives in `src/stock.ts` and is exposed as `reserveStock`.
A customer can cancel with `cancelOrder(id)`; refunds are handled in `src/refunds.ts`.

## Pricing

`priceCart(lines, promoCode)` prices a cart in integer cents.
Promo codes: `BIENVENUE10` gives 10% and `FIDELITE20` gives 20%.

## Reports

`dailySales(orders)` sums orders per Paris day. Logs go through `jsonLinesLogger`.

## Development

Run `pnpm install`, then `pnpm test` and `pnpm typecheck`. Lint with `pnpm lint`.
The catalog is in `src/catalog.ts`.
