/** Percentage discounts, applied to the cart subtotal. */
export const promoCodes: Readonly<Record<string, number>> = {
  BIENVENUE10: 10,
  FIDELITE15: 15,
};

export function discountPercent(code: string | undefined): number {
  if (code === undefined) return 0;
  return promoCodes[code] ?? 0;
}
