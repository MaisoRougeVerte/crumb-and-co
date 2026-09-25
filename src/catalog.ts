export type Sku =
  | "baguette-tradition"
  | "croissant"
  | "pain-au-chocolat"
  | "chausson-pommes"
  | "eclair-cafe"
  | "tarte-citron";

export type Product = {
  sku: Sku;
  name: string;
  priceCents: number;
};

export const catalog: Record<Sku, Product> = {
  "baguette-tradition": { sku: "baguette-tradition", name: "Baguette tradition", priceCents: 120 },
  croissant: { sku: "croissant", name: "Croissant", priceCents: 115 },
  "pain-au-chocolat": { sku: "pain-au-chocolat", name: "Pain au chocolat", priceCents: 135 },
  "chausson-pommes": { sku: "chausson-pommes", name: "Chausson aux pommes", priceCents: 165 },
  "eclair-cafe": { sku: "eclair-cafe", name: "Eclair au café", priceCents: 280 },
  "tarte-citron": { sku: "tarte-citron", name: "Tarte au citron", priceCents: 450 },
};
