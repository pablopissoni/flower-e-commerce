"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: string;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;

  try {
    const [products, countProduct] = await Promise.all([
      // Obtengo los productos
      await prisma.product.findMany({
        take: take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
      }),

      await prisma.product.count({
        // where: { gender: "kid" },
      }),
    ]);

    const totalPages = Math.ceil(countProduct / take);

    const data = products.map((product) => ({
      ...product,
      images: product.ProductImage.map((img) => img.url),
    }));
    return {
      products: data,
      currentPage: +page,
      countProduct,
      totalPages: totalPages,
      // pageSize: take,
      // nextPage: true,
      // previousPage: false,
      // total: 999,
    };
  } catch (error) {
    throw new Error(`No se pudo cargar los productos: ${error}`);
  }
};
