import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Categories } from "@/app/interfaces";

const seedProducts = initialData.products;
interface Props {
  params: {
    id: Categories;
  };
}

const labelGender: Record<Categories, string> = {
  men: "Hombre",
  women: "Mujer",
  kid: "Niños",
  unisex: "Unisex",
};
export default function Category({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((product) => product.gender === id);
  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <div>
      <Title title={`Articulos de ${labelGender[id]}`} subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </div>
  );
}
