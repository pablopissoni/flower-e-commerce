import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

// data temporal
const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function Checkout() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" className="mb-2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Checkout */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>
            {/* Items */}
            {productsInCart.map((product) => (
              <div className="flex mb-5" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>

                  <button className="hover:underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout - Resumen de pedido*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="font-bold">Juan Perez</p>
              <p>Av. Siempre Viva 123</p>
              <p>12345</p>
              <p>Lima, Perú</p>
              <p>+51 123456789</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded-full bg-gray-200 mb-10" />

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
              <p>
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer click en el boton de pago, aceptas nuestros <a href="#">Terminos y Condiciones</a>
                </span>
              </p>
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
