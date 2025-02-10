"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findFirst({
      where: { slug: slug },
      select: {
        inStock: true,
      },
    });
    return stock ? stock.inStock : 0;
  } catch (error) {
    console.log("error al obtener stock: ", error);
    return 0;
  }
};
