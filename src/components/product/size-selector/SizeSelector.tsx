import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  avaliableSizes: Size[];

  onChangeSize: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, avaliableSizes, onChangeSize }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {avaliableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onChangeSize(size)}
            className={clsx(
              "mx-2  text-lg antialiased hover:underline hover:text-blue-500 transition-all duration-200",
              {
                underline: selectedSize === size,
                "font-extrabold text-blue-700": selectedSize === size,
              }
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
