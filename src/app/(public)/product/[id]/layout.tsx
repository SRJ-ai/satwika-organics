export async function generateStaticParams() {
  const productIds = [
    "groundnut-oil",
    "safflower-oil",
    "lakadong-turmeric",
    "wild-forest-honey",
    "aloe-vera-gel",
    "moringa-powder",
  ];

  return productIds.map((id) => ({
    id,
  }));
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
