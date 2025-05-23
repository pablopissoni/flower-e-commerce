export const revalidate = 60; // TODO Testear que funcione

import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "../../components";
import { getPaginatedProductsWithImages } from "@/actions";
interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const searchParamsData = await searchParams; // se llama por separado al ser asincrono
  const page = searchParamsData?.page ? +searchParamsData.page : 1;

  // Lista de productos con paginado
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take: 12 });

  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
