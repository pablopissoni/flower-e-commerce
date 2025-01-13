import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "../../components";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
}
