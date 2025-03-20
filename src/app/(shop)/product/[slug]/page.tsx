export const revalidate = 345600; // TODO Testear que funcione y se revalide cada 4 dias

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
interface Props {
  params: Promise<{ slug: string }>;
  // searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    //TODO configurar las demas Metadatas de las demas paguinas
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[0]}`, ...previousImages],
    },
  };
}

export default async function Product({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  console.log("🚀 ~ Product ~ product:", product);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Mobile Slideshow */}
      <div className="col-span-1 md:col-span-2 block md:hidden">
        <ProductMobileSlideshow images={product.images} title={product.title} />
      </div>
      {/* SliderShow */}
      <div className="col-span-1 md:col-span-2 hidden md:block">
        <ProductSlideshow images={product.images} title={product.title} />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        {/* Opciones de stock //! TEST*/}
        <StockLabel slug={product.slug} />
        {/* Opciones de stock //! TEST*/}
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* Componente seleccionar tallas, cantidad */}
        <AddToCart product={product} />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
