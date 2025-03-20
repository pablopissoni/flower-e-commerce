import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function Cart() {
  // redirect("/checkout/empty");
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" className="mb-2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continuar comprando
            </Link>
            {/* Items */}
            <ProductsInCart />
          </div>
          {/* Checkout - Resumen de pedido*/}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>Num. de articulos</span>
              <span className="text-right">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$30</span>

              <span>Impuesto</span>
              <span className="text-right">$2</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$32</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link href="/checkout/address" className="btn-primary flex justify-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
