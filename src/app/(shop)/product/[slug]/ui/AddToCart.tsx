"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addtoCart = () => {
    setPosted(true);
    console.log("agregar al carrito: ", { size, quantity });
  };

  return (
    <>
      {/* Alerta si no hay talla */}
      {!size && posted && <span className="text-red-500 fade-in">* Selecciona una talla</span>}
      {/* Selector de tallas */}
      <SizeSelector selectedSize={size} avaliableSizes={product.sizes} onChangeSize={(size) => setSize(size)} />
      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onChangeQuantity={(quantity) => setQuantity(quantity)} />
      {/* Boton de agregar al carrito */}
      <button onClick={addtoCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
