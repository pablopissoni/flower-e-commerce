"use client";
import Image from "next/image";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";

export const ProductsInCart = () => {
  // si hubiese problemas de hidratacion se puede usar un loader
  const productsInCart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProductFromCart);

  return (
    <>
      {productsInCart.map((product) => (
        <div className="flex mb-5" key={`${product.id}-${product.size}`}>
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
          />

          <div>
            <Link href={`/product/${product.slug}`} className="hover:underline">
              <p>{product.title}</p>
            </Link>
            <p>Talle: {product.size}</p>
            <p>Precio: ${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onChangeQuantity={(quantity) => updateQuantity(product, quantity)}
            />
            <button className="hover:underline mt-3" onClick={() => removeProduct(product)}>
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
