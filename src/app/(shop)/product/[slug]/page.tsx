import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
interface Props {
  params: {
    slug: string;
  };
}

export default function Product({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((prod) => prod.slug === slug);

  if (!product) {
    notFound();
  }

  console.log("🚀 ~ Product ~ params:", slug);
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SliderShow */}
      <div className="col-span-1 md:col-span-2">hola</div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* Selector de tallas */}

        {/* Selector de cantidad */}

        {/* Boton de agregar al carrito */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
