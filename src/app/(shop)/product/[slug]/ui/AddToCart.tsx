"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart); // Store de carrito
  const [selectedSize, SetSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isPosted, setIsPosted] = useState(false);

  const addtoCart = () => {
    setIsPosted(true);
    if (!selectedSize) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    // Reseteo los valores
    setIsPosted(false);
    setQuantity(1);
    SetSelectedSize(undefined);

    console.log("agregar al carrito: ", cartProduct);
  };

  return (
    <>
      {/* Alerta si no hay talla */}
      {!selectedSize && isPosted && <span className="text-red-500 fade-in">* Selecciona una talla</span>}
      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={selectedSize}
        avaliableSizes={product.sizes}
        onChangeSize={(selectedSize) => SetSelectedSize(selectedSize)}
      />
      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onChangeQuantity={(quantity) => setQuantity(quantity)} />
      {/* Boton de agregar al carrito */}
      <button onClick={addtoCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
