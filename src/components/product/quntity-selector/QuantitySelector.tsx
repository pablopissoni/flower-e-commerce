"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(1);

  const handleCount = (value: number) => {
    if (count + value < 1 || count + value > 10) {
      return;
    }
    setCount(count + value);
  };

  return (
    <div className="flex">
      <button onClick={() => handleCount(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">{count}</span>
      <button>
        <IoAddCircleOutline onClick={() => handleCount(1)} />
      </button>
    </div>
  );
};
