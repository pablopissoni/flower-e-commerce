"use client";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { currencyFormat } from "@/utils";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  // "useShallow" soluciona el problea de re-renderizado y actualiza el componente solo cuando cambia el estado
  const { subTotal, tax, total, itemInCart } = useCartStore(useShallow((state) => state.getSummaryInformation()));

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="bg-white rounded-xl shadow-xl p-7 h-fit">Cargando...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>Num. de articulos</span>
        <span className="text-right">{itemInCart === 1 ? `${itemInCart} producto` : `${itemInCart} Productos`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <Link href="/checkout/address" className="btn-primary flex justify-center">
          Checkout
        </Link>
      </div>
    </div>
  );
};
