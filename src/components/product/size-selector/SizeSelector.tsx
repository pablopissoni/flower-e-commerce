import type { Size } from "@/app/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: Size;
  avaliableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, avaliableSizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {avaliableSizes.map((size) => (
          <button
            className={clsx("mx-2 hover:underline text-lg", {
              underline: selectedSize === size,
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
