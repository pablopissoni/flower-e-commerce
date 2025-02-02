import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //! Borra los registros previos
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products } = initialData;

  //* CATEGORIAS
  // -- Crear las categorias en la tabla de la base de datos
  const categoriesData = categories.map((category) => ({ name: category }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  // Obtengo las categorias de la base de datos
  const categoriesDb = await prisma.category.findMany();

  // mapeo de las categorias y los key son los nombres de las categorias con minúsculas y los values son los ids de las categorias
  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //* PRODUCTOS
  // -- Crear los productos en la tabla de la base de datos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Mapeo las imagenes del producto y las inserto en la DB con el id del producto
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));
    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("initialData cargada");
}

(() => {
  // Todo poder leer las variables de entorno correctamente
  // if (process.env.NODE_ENV === "production") return;
  console.log("🚀 ~ process.env.DB_USER:", process.env.DB_USER);
  console.log("🚀 ~ process.env.NEXT_PUBLIC_ENV:", process.env.NEXT_PUBLIC_ENV);
  main();
})();
