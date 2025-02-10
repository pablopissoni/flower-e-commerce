"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: { slug: slug },
    });

    if (!product) {
      return null;
      //   throw new Error(`No se pudo encontrar el producto con slug: ${slug}`);
    }
    const images = product.ProductImage.map((img) => img.url);
    const { ProductImage, ...rest } = product;

    return {
      ...rest,
      images,
    };
  } catch (error) {
    console.log("error: ", error);
    throw new Error(`Error al obtener producto por slug: ${error}`);
  }
};
