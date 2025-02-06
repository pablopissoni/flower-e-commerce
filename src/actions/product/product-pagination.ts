"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;

  // Valido que el género sea válido
  const validGenders = ["men", "women", "kid", "unisex"];
  if (gender && !validGenders.includes(gender)) {
    throw new Error("Género no válido. Debe ser 'men', 'women', 'kid' o 'unisex'.");
  }

  try {
    const [products, countProduct] = await Promise.all([
      // Obtengo los productos
      await prisma.product.findMany({
        take: take,
        skip: (page - 1) * take,
        where: { gender: gender },
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
        where: { gender: gender },
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
