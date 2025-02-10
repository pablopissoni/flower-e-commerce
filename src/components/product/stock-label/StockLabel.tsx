"use client";
import { titleFont } from "@/config/fonts";
import { getStockBySlug } from "@/actions";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <>
      {loading ? (
        <h3 className={`${titleFont.className} antialiased font-bold text-base rounded-3xl animate-pulse`}>
          Stock: ...
        </h3>
      ) : (
        <h3 className={`${titleFont.className} antialiased font-bold text-base`}>Stock: {stock}</h3>
      )}
    </>
  );
};
