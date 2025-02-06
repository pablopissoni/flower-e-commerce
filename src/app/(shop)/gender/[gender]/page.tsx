export const revalidate = 60; // TODO Testear que funcione

import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page: string }>;
}

const labelGender: Record<string, string> = {
  men: "Hombre",
  women: "Mujer",
  kid: "Niños",
  unisex: "Unisex",
};

export default async function Category({ params, searchParams }: Props) {
  // se llama por separado al ser asincrono
  const searchParamsData = await searchParams;
  const page = searchParamsData?.page ? +searchParamsData.page : 1;

  const { gender } = await params;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take: 12, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <div>
      <Title title={`Articulos de ${labelGender[gender]}`} subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
