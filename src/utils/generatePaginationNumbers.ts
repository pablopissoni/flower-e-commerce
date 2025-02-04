// Genera numeros de paginacion
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // Si hya menos de 7 paginas se muestran todas sin '...'
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Si la pagina actual esta entre las primeras 3 mostrar las primeras 3, '...' y las ultimas 2 paginas
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Si esta entre las ultimas 3 paginas mostrar las primeras 2 paginas, '...' y las ultimas 3
  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Si esta en medio mostrar la primera pagina, '...', la pagina anterior , la actual, la siguiente pagina, '...' y la ultima pagina
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
