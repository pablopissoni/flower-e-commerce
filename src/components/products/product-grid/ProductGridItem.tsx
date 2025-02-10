"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImages, setDisplayImages] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      {/* Imagen con Link*/}
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImages}`}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          alt={product.title}
          onMouseEnter={() => setDisplayImages(product.images[1])}
          onMouseLeave={() => setDisplayImages(product.images[0])}
        />
      </Link>
      {/* Titulo con Link*/}
      <div className="p-4 flex flex-col ">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600 transition-all">
          <span className="font-bold">{product.title}</span>
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
