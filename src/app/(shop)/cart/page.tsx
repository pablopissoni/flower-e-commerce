import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

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
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
