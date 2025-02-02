"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;

  try {
    const products = await prisma.product.findMany({
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
    });

    const data = products.map((product) => ({
      ...product,
      images: product.ProductImage.map((img) => img.url),
    }));
    return {
      products: data,
      currentPage: +page,
      pageSize: 12,
      totalPages: 1,
      nextPage: true,
      previousPage: false,
      total: 999,
    };
  } catch (error) {
    throw new Error(`No se pudo cargar los productos: ${error}`);
  }
};
