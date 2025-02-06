import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

// data temporal
const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

interface Props {
  params: Promise<{
    id: string;
  }>;
}
// interface Props {
//   params: {
//     id: string;
//   }
// }

export default async function Order({ params }: Props) {
  const { id } = await params;

  // Todo verificar que el id sea valido

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} className="mb-2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Checkout */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                "bg-red-500": true,
                "bg-green-700": false,
              })}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>

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
              <div
                className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                  "bg-red-500": true,
                  "bg-green-700": false,
                })}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
