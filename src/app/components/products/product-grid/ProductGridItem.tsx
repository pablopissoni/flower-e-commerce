import { Product } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${product.images[0]}`}
          className="w-full object-cover"
          width={500}
          height={500}
          alt={product.title}
        />
      </Link>
      {/* Titulo */}
      <div className="p-4 flex flex-col ">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600 transition-all">
          <span className="font-bold">{product.title}</span>
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
