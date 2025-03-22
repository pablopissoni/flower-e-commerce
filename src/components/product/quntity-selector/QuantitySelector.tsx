"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onChangeQuantity: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onChangeQuantity }: Props) => {
  // const [count, setCount] = useState(1 || quantity); //TODO revisar el uso de quantity

  // Todo: El tope de cantidad podria ser un parametro de stock
  const handleCount = (value: number) => {
    if (quantity + value < 1 || quantity + value > 10) {
      return;
    }
    onChangeQuantity(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => handleCount(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">{quantity}</span>
      <button>
        <IoAddCircleOutline onClick={() => handleCount(1)} />
      </button>
    </div>
  );
};
